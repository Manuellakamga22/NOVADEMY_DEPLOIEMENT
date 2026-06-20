jest.mock("../repositories/trialRequestRepository", () => ({
  findExistingTrialRequest: jest.fn(),
  createTrialRequest: jest.fn(),
  getTeacherTrials: jest.fn(),
  getStudentTrials: jest.fn(),
  updateTrialStatus: jest.fn(),
}));

const trialRepository = require("../repositories/trialRepository");
const trialService = require("../services/trialService");

describe("trialService", () => {
  const validTrialRequest = {
    announcement_id: 12,
    student_id: 3,
    teacher_id: 7,
    requested_day: "2026-04-02",
    requested_start_time: "14:00:00",
    requested_end_time: "15:00:00"
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create trial request successfully", async () => {
    trialRepository.findExistingTrialRequest.mockResolvedValue(null);
    trialRepository.createTrialRequest.mockResolvedValue({ insertId: 20 });

    const result = await trialService.createTrialRequest(validTrialRequest);

    expect(trialRepository.findExistingTrialRequest).toHaveBeenCalledWith(
      12,
      3,
      7
    );

    expect(trialRepository.createTrialRequest).toHaveBeenCalledWith({
      announcement_id: 12,
      student_id: 3,
      teacher_id: 7,
      requested_day: "2026-04-02",
      requested_start_time: "14:00:00",
      requested_end_time: "15:00:00"
    });

    expect(result).toEqual({
      message: "Demande envoyée",
      id: 20
    });
  });

  test("should fail if trial request already exists", async () => {
    trialRepository.findExistingTrialRequest.mockResolvedValue({ id: 8 });

    await expect(
      trialService.createTrialRequest(validTrialRequest)
    ).rejects.toEqual({
      status: 400,
      message: "Une demande de cours d'essai existe déjà pour cette annonce."
    });
  });

  test("should fail if required fields are missing", async () => {
    const invalidTrialRequest = {
      ...validTrialRequest,
      student_id: null
    };

    await expect(
      trialService.createTrialRequest(invalidTrialRequest)
    ).rejects.toEqual({
      status: 400,
      message: "Champs obligatoires manquants"
    });
  });

  test("should get teacher trials successfully", async () => {
    const fakeTrials = [{ id: 1 }, { id: 2 }];
    trialRepository.getTeacherTrials.mockResolvedValue(fakeTrials);

    const result = await trialService.getTeacherTrials(7);

    expect(trialRepository.getTeacherTrials).toHaveBeenCalledWith(7);
    expect(result).toEqual(fakeTrials);
  });

  test("should fail if teacherId is missing", async () => {
    await expect(
      trialService.getTeacherTrials(null)
    ).rejects.toEqual({
      status: 400,
      message: "teacherId manquant"
    });
  });

  test("should get student trials successfully", async () => {
    const fakeTrials = [{ id: 1 }, { id: 2 }];
    trialRepository.getStudentTrials.mockResolvedValue(fakeTrials);

    const result = await trialService.getStudentTrials(3);

    expect(trialRepository.getStudentTrials).toHaveBeenCalledWith(3);
    expect(result).toEqual(fakeTrials);
  });

  test("should fail if studentId is missing", async () => {
    await expect(
      trialService.getStudentTrials(null)
    ).rejects.toEqual({
      status: 400,
      message: "studentId manquant"
    });
  });

  test("should update trial status successfully", async () => {
    trialRepository.updateTrialStatus.mockResolvedValue({});

    const result = await trialService.updateTrialStatus(5, "accepted");

    expect(trialRepository.updateTrialStatus).toHaveBeenCalledWith(5, "accepted");
    expect(result).toEqual({
      message: "Statut mis à jour"
    });
  });

  test("should fail if id or status is missing", async () => {
    await expect(
      trialService.updateTrialStatus(null, null)
    ).rejects.toEqual({
      status: 400,
      message: "ID et statut obligatoires"
    });
  });

  test("should fail if status is invalid", async () => {
    await expect(
      trialService.updateTrialStatus(5, "invalid-status")
    ).rejects.toEqual({
      status: 400,
      message: "Statut invalide"
    });
  });
});