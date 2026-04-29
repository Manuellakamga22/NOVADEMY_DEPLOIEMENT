const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authRepository = require("../repositories/authRepository");
const authService = require("../services/authService");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("crypto");
jest.mock("../repositories/authRepository");

describe("authService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test_secret";
  });

  describe("register", () => {
    const validUserData = {
      nom: "Kamga",
      prenom: "Rosalie",
      email: "rosalie@gmail.com",
      password: "Password1",
      role: "ELEVE",
    };

    it("should register a user successfully", async () => {
      authRepository.findUserByEmail.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashedPassword123");
      authRepository.createUser.mockResolvedValue({ insertId: 1 });

      const result = await authService.register(validUserData);

      expect(authRepository.findUserByEmail).toHaveBeenCalledWith("rosalie@gmail.com");
      expect(bcrypt.hash).toHaveBeenCalledWith("Password1", 10);
      expect(authRepository.createUser).toHaveBeenCalledWith({
        nom: "Kamga",
        prenom: "Rosalie",
        email: "rosalie@gmail.com",
        password: "hashedPassword123",
        role: "ELEVE",
      });

      expect(result).toEqual({
        message: "Utilisateur créé avec succès",
        user: {
          id: 1,
          nom: "Kamga",
          prenom: "Rosalie",
          email: "rosalie@gmail.com",
          role: "ELEVE",
        },
      });
    });

    it("should throw if one field is missing", async () => {
      await expect(
        authService.register({
          nom: "Kamga",
          prenom: "Rosalie",
          email: "",
          password: "Password1",
          role: "ELEVE",
        })
      ).rejects.toEqual({
        status: 400,
        message: "Tous les champs sont obligatoires.",
      });

      expect(authRepository.findUserByEmail).not.toHaveBeenCalled();
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(authRepository.createUser).not.toHaveBeenCalled();
    });

    it("should throw if password is not strong enough", async () => {
      await expect(
        authService.register({
          nom: "Kamga",
          prenom: "Rosalie",
          email: "rosalie@gmail.com",
          password: "pass",
          role: "ELEVE",
        })
      ).rejects.toEqual({
        status: 400,
        message: "Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre.",
      });

      expect(authRepository.findUserByEmail).not.toHaveBeenCalled();
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(authRepository.createUser).not.toHaveBeenCalled();
    });

    it("should throw if email already exists", async () => {
      authRepository.findUserByEmail.mockResolvedValue({
        id: 1,
        email: "rosalie@gmail.com",
      });

      await expect(authService.register(validUserData)).rejects.toEqual({
        status: 400,
        message: "Email déjà utilisé.",
      });

      expect(authRepository.findUserByEmail).toHaveBeenCalledWith("rosalie@gmail.com");
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(authRepository.createUser).not.toHaveBeenCalled();
    });

    it("should propagate repository error during register email lookup", async () => {
      authRepository.findUserByEmail.mockRejectedValue(new Error("Database error"));

      await expect(authService.register(validUserData)).rejects.toThrow("Database error");

      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(authRepository.createUser).not.toHaveBeenCalled();
    });

    it("should propagate bcrypt error during register", async () => {
      authRepository.findUserByEmail.mockResolvedValue(null);
      bcrypt.hash.mockRejectedValue(new Error("Hash error"));

      await expect(authService.register(validUserData)).rejects.toThrow("Hash error");

      expect(authRepository.createUser).not.toHaveBeenCalled();
    });

    it("should propagate repository error during user creation", async () => {
      authRepository.findUserByEmail.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashedPassword123");
      authRepository.createUser.mockRejectedValue(new Error("Create user error"));

      await expect(authService.register(validUserData)).rejects.toThrow("Create user error");
    });
  });

  describe("login", () => {
    const validLoginData = {
      email: "rosalie@gmail.com",
      password: "Password1",
    };

    const mockUser = {
      id: 1,
      nom: "Kamga",
      prenom: "Rosalie",
      email: "rosalie@gmail.com",
      password: "hashedPassword123",
      role: "ELEVE",
    };

    it("should login successfully", async () => {
      authRepository.findUserByEmail.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("fake_jwt_token");

      const result = await authService.login(validLoginData);

      expect(authRepository.findUserByEmail).toHaveBeenCalledWith("rosalie@gmail.com");
      expect(bcrypt.compare).toHaveBeenCalledWith("Password1", "hashedPassword123");
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 1, role: "ELEVE", email: "rosalie@gmail.com" },
        "test_secret",
        { expiresIn: "1d" }
      );

      expect(result).toEqual({
        message: "Connexion réussie",
        token: "fake_jwt_token",
        user: {
          id: 1,
          nom: "Kamga",
          prenom: "Rosalie",
          email: "rosalie@gmail.com",
          role: "ELEVE",
        },
      });
    });

    it("should throw if email is missing", async () => {
      await expect(
        authService.login({ email: "", password: "Password1" })
      ).rejects.toEqual({
        status: 400,
        message: "Email et mot de passe obligatoires.",
      });

      expect(authRepository.findUserByEmail).not.toHaveBeenCalled();
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it("should throw if password is missing", async () => {
      await expect(
        authService.login({ email: "rosalie@gmail.com", password: "" })
      ).rejects.toEqual({
        status: 400,
        message: "Email et mot de passe obligatoires.",
      });

      expect(authRepository.findUserByEmail).not.toHaveBeenCalled();
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it("should throw if user is not found", async () => {
      authRepository.findUserByEmail.mockResolvedValue(null);

      await expect(authService.login(validLoginData)).rejects.toEqual({
        status: 404,
        message: "Utilisateur introuvable.",
      });

      expect(authRepository.findUserByEmail).toHaveBeenCalledWith("rosalie@gmail.com");
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it("should throw if password is incorrect", async () => {
      authRepository.findUserByEmail.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await expect(authService.login(validLoginData)).rejects.toEqual({
        status: 401,
        message: "Mot de passe incorrect.",
      });

      expect(authRepository.findUserByEmail).toHaveBeenCalledWith("rosalie@gmail.com");
      expect(bcrypt.compare).toHaveBeenCalledWith("Password1", "hashedPassword123");
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it("should propagate repository error during login", async () => {
      authRepository.findUserByEmail.mockRejectedValue(new Error("Database error"));

      await expect(authService.login(validLoginData)).rejects.toThrow("Database error");

      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it("should propagate bcrypt error during login", async () => {
      authRepository.findUserByEmail.mockResolvedValue(mockUser);
      bcrypt.compare.mockRejectedValue(new Error("Compare error"));

      await expect(authService.login(validLoginData)).rejects.toThrow("Compare error");

      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it("should propagate jwt error during login", async () => {
      authRepository.findUserByEmail.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockImplementation(() => {
        throw new Error("JWT error");
      });

      await expect(authService.login(validLoginData)).rejects.toThrow("JWT error");
    });
  });

  describe("forgotPassword", () => {
    const mockUser = {
      id: 1,
      email: "rosalie@gmail.com",
    };

    it("should generate reset token successfully", async () => {
      authRepository.findUserByEmail.mockResolvedValue(mockUser);

      const mockToString = jest.fn().mockReturnValue("reset_token_123");
      crypto.randomBytes.mockReturnValue({
        toString: mockToString,
      });

      authRepository.createResetToken.mockResolvedValue();

      const result = await authService.forgotPassword({
        email: "rosalie@gmail.com",
      });

      expect(authRepository.findUserByEmail).toHaveBeenCalledWith("rosalie@gmail.com");
      expect(crypto.randomBytes).toHaveBeenCalledWith(32);
      expect(mockToString).toHaveBeenCalledWith("hex");
      expect(authRepository.createResetToken).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        message: "Lien de réinitialisation généré.",
        resetToken: "reset_token_123",
      });
    });

    it("should throw if email is missing", async () => {
      await expect(
        authService.forgotPassword({ email: "" })
      ).rejects.toEqual({
        status: 400,
        message: "Email obligatoire.",
      });

      expect(authRepository.findUserByEmail).not.toHaveBeenCalled();
      expect(authRepository.createResetToken).not.toHaveBeenCalled();
    });

    it("should throw if user is not found", async () => {
      authRepository.findUserByEmail.mockResolvedValue(null);

      await expect(
        authService.forgotPassword({ email: "unknown@gmail.com" })
      ).rejects.toEqual({
        status: 404,
        message: "Aucun utilisateur avec cet email.",
      });

      expect(authRepository.createResetToken).not.toHaveBeenCalled();
    });

    it("should propagate repository error during forgotPassword", async () => {
      authRepository.findUserByEmail.mockRejectedValue(new Error("Database error"));

      await expect(
        authService.forgotPassword({ email: "rosalie@gmail.com" })
      ).rejects.toThrow("Database error");
    });

    it("should propagate repository error when saving reset token", async () => {
      authRepository.findUserByEmail.mockResolvedValue(mockUser);

      const mockToString = jest.fn().mockReturnValue("reset_token_123");
      crypto.randomBytes.mockReturnValue({
        toString: mockToString,
      });

      authRepository.createResetToken.mockRejectedValue(new Error("Create token error"));

      await expect(
        authService.forgotPassword({ email: "rosalie@gmail.com" })
      ).rejects.toThrow("Create token error");
    });
  });

  describe("resetPassword", () => {
    const validResetData = {
      token: "reset_token_123",
      newPassword: "NewPassword1",
    };

    const mockResetRow = {
      user_id: 1,
      expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    };

    it("should reset password successfully", async () => {
      authRepository.findLatestResetToken.mockResolvedValue(mockResetRow);
      bcrypt.hash.mockResolvedValue("newHashedPassword123");
      authRepository.updatePassword.mockResolvedValue();
      authRepository.deleteResetTokensByUserId.mockResolvedValue();

      const result = await authService.resetPassword(validResetData);

      expect(authRepository.findLatestResetToken).toHaveBeenCalledWith("reset_token_123");
      expect(bcrypt.hash).toHaveBeenCalledWith("NewPassword1", 10);
      expect(authRepository.updatePassword).toHaveBeenCalledWith(1, "newHashedPassword123");
      expect(authRepository.deleteResetTokensByUserId).toHaveBeenCalledWith(1);

      expect(result).toEqual({
        message: "Mot de passe réinitialisé avec succès.",
      });
    });

    it("should throw if token is missing", async () => {
      await expect(
        authService.resetPassword({ token: "", newPassword: "NewPassword1" })
      ).rejects.toEqual({
        status: 400,
        message: "Token et nouveau mot de passe obligatoires.",
      });

      expect(authRepository.findLatestResetToken).not.toHaveBeenCalled();
      expect(bcrypt.hash).not.toHaveBeenCalled();
    });

    it("should throw if new password is missing", async () => {
      await expect(
        authService.resetPassword({ token: "reset_token_123", newPassword: "" })
      ).rejects.toEqual({
        status: 400,
        message: "Token et nouveau mot de passe obligatoires.",
      });

      expect(authRepository.findLatestResetToken).not.toHaveBeenCalled();
      expect(bcrypt.hash).not.toHaveBeenCalled();
    });

    it("should throw if new password is not strong enough", async () => {
      await expect(
        authService.resetPassword({ token: "reset_token_123", newPassword: "weak" })
      ).rejects.toEqual({
        status: 400,
        message: "Mot de passe non sécurisé.",
      });

      expect(authRepository.findLatestResetToken).not.toHaveBeenCalled();
      expect(bcrypt.hash).not.toHaveBeenCalled();
    });

    it("should throw if token is invalid", async () => {
      authRepository.findLatestResetToken.mockResolvedValue(null);

      await expect(authService.resetPassword(validResetData)).rejects.toEqual({
        status: 404,
        message: "Token invalide.",
      });

      expect(authRepository.findLatestResetToken).toHaveBeenCalledWith("reset_token_123");
      expect(bcrypt.hash).not.toHaveBeenCalled();
    });

    it("should throw if token is expired", async () => {
      authRepository.findLatestResetToken.mockResolvedValue({
        user_id: 1,
        expires_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      });

      await expect(authService.resetPassword(validResetData)).rejects.toEqual({
        status: 400,
        message: "Token expiré.",
      });

      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(authRepository.updatePassword).not.toHaveBeenCalled();
      expect(authRepository.deleteResetTokensByUserId).not.toHaveBeenCalled();
    });

    it("should propagate repository error during reset token lookup", async () => {
      authRepository.findLatestResetToken.mockRejectedValue(new Error("Database error"));

      await expect(authService.resetPassword(validResetData)).rejects.toThrow("Database error");

      expect(bcrypt.hash).not.toHaveBeenCalled();
    });

    it("should propagate bcrypt error during reset password", async () => {
      authRepository.findLatestResetToken.mockResolvedValue(mockResetRow);
      bcrypt.hash.mockRejectedValue(new Error("Hash error"));

      await expect(authService.resetPassword(validResetData)).rejects.toThrow("Hash error");

      expect(authRepository.updatePassword).not.toHaveBeenCalled();
      expect(authRepository.deleteResetTokensByUserId).not.toHaveBeenCalled();
    });

    it("should propagate repository error during password update", async () => {
      authRepository.findLatestResetToken.mockResolvedValue(mockResetRow);
      bcrypt.hash.mockResolvedValue("newHashedPassword123");
      authRepository.updatePassword.mockRejectedValue(new Error("Update password error"));

      await expect(authService.resetPassword(validResetData)).rejects.toThrow(
        "Update password error"
      );

      expect(authRepository.deleteResetTokensByUserId).not.toHaveBeenCalled();
    });

    it("should propagate repository error during token deletion", async () => {
      authRepository.findLatestResetToken.mockResolvedValue(mockResetRow);
      bcrypt.hash.mockResolvedValue("newHashedPassword123");
      authRepository.updatePassword.mockResolvedValue();
      authRepository.deleteResetTokensByUserId.mockRejectedValue(
        new Error("Delete tokens error")
      );

      await expect(authService.resetPassword(validResetData)).rejects.toThrow(
        "Delete tokens error"
      );
    });
  });
});