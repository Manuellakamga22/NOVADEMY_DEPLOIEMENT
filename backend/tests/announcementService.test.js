jest.mock("../repositories/announcementRepository", () => ({
  findTeacherAnnouncementBySubject: jest.fn(),
  createAnnouncement: jest.fn(),
  getActiveAnnouncements: jest.fn(),
  getAnnouncementById: jest.fn(),
  getTeacherAnnouncements: jest.fn(),
}));

const announcementRepository = require("../repositories/announcementRepository");
const announcementService = require("../services/announcementService");

describe("announcementService", () => {
  const validAnnouncement = {
    teacher_id: 1,
    subject: "Mathématiques",
    level: "Terminale",
    city: "Paris",
    mode: "Visio",
    title: "Cours de maths",
    description: "Préparation au bac",
    methodology: "Méthode claire et exercices",
    student_rate: 25,
    teacher_rate: 20
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create announcement successfully", async () => {
    announcementRepository.findTeacherAnnouncementBySubject.mockResolvedValue(null);
    announcementRepository.createAnnouncement.mockResolvedValue({ insertId: 10 });

    const result = await announcementService.createAnnouncement(validAnnouncement);

    expect(
      announcementRepository.findTeacherAnnouncementBySubject
    ).toHaveBeenCalledWith(1, "Mathématiques");

    expect(announcementRepository.createAnnouncement).toHaveBeenCalledWith(validAnnouncement);

    expect(result).toEqual({
      message: "Annonce créée avec succès",
      id: 10
    });
  });

  test("should fail if teacher already has an announcement for this subject", async () => {
    announcementRepository.findTeacherAnnouncementBySubject.mockResolvedValue({ id: 5 });

    await expect(
      announcementService.createAnnouncement(validAnnouncement)
    ).rejects.toEqual({
      status: 400,
      message: "Vous avez déjà créé une annonce pour cette matière."
    });
  });

  test("should fail if required fields are missing", async () => {
    const invalidAnnouncement = {
      ...validAnnouncement,
      subject: ""
    };

    await expect(
      announcementService.createAnnouncement(invalidAnnouncement)
    ).rejects.toEqual({
      status: 400,
      message: "Tous les champs sont obligatoires."
    });
  });

  test("should get active announcements successfully", async () => {
    const fakeAnnouncements = [{ id: 1 }, { id: 2 }];
    announcementRepository.getActiveAnnouncements.mockResolvedValue(fakeAnnouncements);

    const result = await announcementService.getActiveAnnouncements({
      subject: "Mathématiques",
      city: "Paris",
      mode: "Visio"
    });

    expect(announcementRepository.getActiveAnnouncements).toHaveBeenCalledWith({
      subject: "Mathématiques",
      city: "Paris",
      mode: "Visio"
    });

    expect(result).toEqual(fakeAnnouncements);
  });

  test("should get one announcement by id successfully", async () => {
    const fakeAnnouncement = { id: 10, title: "Cours de maths" };
    announcementRepository.getAnnouncementById.mockResolvedValue(fakeAnnouncement);

    const result = await announcementService.getAnnouncementById(10);

    expect(announcementRepository.getAnnouncementById).toHaveBeenCalledWith(10);
    expect(result).toEqual(fakeAnnouncement);
  });

  test("should fail if announcement id is missing", async () => {
    await expect(
      announcementService.getAnnouncementById(null)
    ).rejects.toEqual({
      status: 400,
      message: "ID annonce manquant"
    });
  });

  test("should fail if announcement is not found", async () => {
    announcementRepository.getAnnouncementById.mockResolvedValue(null);

    await expect(
      announcementService.getAnnouncementById(999)
    ).rejects.toEqual({
      status: 404,
      message: "Annonce introuvable"
    });
  });

  test("should get teacher announcements successfully", async () => {
    const fakeAnnouncements = [{ id: 1 }, { id: 2 }];
    announcementRepository.getTeacherAnnouncements.mockResolvedValue(fakeAnnouncements);

    const result = await announcementService.getTeacherAnnouncements(7);

    expect(announcementRepository.getTeacherAnnouncements).toHaveBeenCalledWith(7);
    expect(result).toEqual(fakeAnnouncements);
  });

  test("should fail if teacher id is missing in getTeacherAnnouncements", async () => {
    await expect(
      announcementService.getTeacherAnnouncements(null)
    ).rejects.toEqual({
      status: 400,
      message: "ID professeur manquant"
    });
  });
});