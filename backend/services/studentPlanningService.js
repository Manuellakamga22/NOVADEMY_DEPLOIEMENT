const studentPlanningRepository = require("../repositories/studentPlanningRepository");

exports.getStudentPlanning = async (studentId) => {
  if (!studentId) {
    throw { status: 400, message: "studentId manquant" };
  }

  const rows = await studentPlanningRepository.getStudentPlanningByStudentId(studentId);

  return rows.map((item) => ({
    id: item.id,
    student_id: item.student_id,
    teacher_id: item.teacher_id,
    announcement_id: item.announcement_id,
    planning_id: item.planning_id,
    requested_date: item.requested_date,
    requested_day: item.requested_day,
    requested_start_time: item.requested_start_time,
    requested_end_time: item.requested_end_time,
    duration_minutes: item.duration_minutes,
    course_type: item.course_type,
    period_end: item.period_end,
    status: item.status,
    visio_link: item.visio_link,
    created_at: item.created_at,
    subject: item.subject || "",
    announcement_title: item.announcement_title || "",
    mode: item.mode || "",
    teacher_name:
      item.teacher_prenom && item.teacher_nom
        ? `${item.teacher_prenom} ${item.teacher_nom}`
        : `Professeur #${item.teacher_id}`,
  }));
};
