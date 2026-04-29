import React, { useEffect, useMemo, useState } from "react";

const S = {
  wrap: { fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#F9FAFB" },
  dash: { display: "grid", gridTemplateColumns: "280px 1fr", minHeight: "100vh" },
  sidebar: { background: "#fff", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto" },
  sbBrand: { padding: "26px 22px", borderBottom: "1px solid #E5E7EB" },
  logo: { fontSize: 21, fontWeight: 800, letterSpacing: "-0.02em" },
  logoEm: { color: "#2563EB" },
  sbRole: { display: "inline-block", marginTop: 10, fontSize: 14, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 20, background: "#EFF6FF", color: "#2563EB" },
  sbNav: { padding: 14, flex: 1 },
  sbLabel: { fontSize: 13, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#9CA3AF", padding: "0 10px", margin: "18px 0 8px", display: "block" },
  sbLink: { display: "flex", alignItems: "center", gap: 12, padding: "14px 15px", borderRadius: 10, fontSize: 18, fontWeight: 500, color: "#4B5563", textDecoration: "none", marginBottom: 4 },
  sbLinkActive: { display: "flex", alignItems: "center", gap: 12, padding: "14px 15px", borderRadius: 10, fontSize: 18, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", textDecoration: "none", marginBottom: 4 },
  sbBadge: { marginLeft: "auto", background: "#2563EB", color: "#fff", fontSize: 13, fontWeight: 700, padding: "3px 9px", borderRadius: 10 },
  sbUser: { padding: "18px 22px", borderTop: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12 },
  av: { width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 17, flexShrink: 0 },
  main: { padding: "30px 30px" },
  smallTitle: { fontSize: 30, fontWeight: 800, color: "#111827", margin: 0 },
  smallSub: { fontSize: 18, color: "#6B7280", marginTop: 8, lineHeight: 1.7, maxWidth: "900px" },
  stats: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, margin: "22px 0" },
  statAccent: { background: "#2563EB", border: "1px solid #2563EB", borderRadius: 16, padding: "22px 24px" },
  stat: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: "22px 24px" },
  statLabelW: { fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,.78)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 },
  statLabel: { fontSize: 14, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 },
  statValW: { fontSize: 34, fontWeight: 800, color: "#fff" },
  statVal: { fontSize: 34, fontWeight: 800, color: "#111827" },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: "22px 24px", marginBottom: 18 },
  cardTitle: { fontSize: 19, fontWeight: 800, marginBottom: 14, color: "#111827" },
  noteBox: { background: "#EFF6FF", border: "1px solid #BFDBFE", color: "#1D4ED8", borderRadius: 12, padding: "15px 16px", fontSize: 17, lineHeight: 1.7, marginBottom: 16 },
  fieldGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 },
  label: { display: "block", fontSize: 17, fontWeight: 700, color: "#374151", marginBottom: 8 },
  input: { width: "100%", padding: "13px 14px", borderRadius: 10, border: "1.5px solid #E5E7EB", fontFamily: "inherit", fontSize: 17, outline: "none", background: "#fff", boxSizing: "border-box" },
  daysRow: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 10, marginBottom: 18 },
  dayBtn: { minHeight: "62px", borderRadius: 12, border: "1.5px solid #E5E7EB", background: "#fff", color: "#4B5563", fontSize: 16, fontWeight: 700, cursor: "pointer" },
  dayBtnActive: { minHeight: "62px", borderRadius: 12, border: "1.5px solid #2563EB", background: "#EFF6FF", color: "#2563EB", fontSize: 16, fontWeight: 800, cursor: "pointer" },
  timeNav: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap" },
  navBtn: { border: "none", borderRadius: 10, background: "#F3F4F6", color: "#374151", fontSize: 16, fontWeight: 700, padding: "10px 14px", cursor: "pointer" },
  timeGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 18 },
  slotBtn: { minHeight: "64px", borderRadius: 12, border: "1.5px solid #E5E7EB", background: "#fff", color: "#4B5563", fontSize: 16, fontWeight: 700, cursor: "pointer" },
  slotBtnActive: { minHeight: "64px", borderRadius: 12, border: "1.5px solid #2563EB", background: "#EFF6FF", color: "#2563EB", fontSize: 16, fontWeight: 800, cursor: "pointer" },
  btnRow: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 },
  btn: { display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", fontSize: 16, fontWeight: 700, padding: "10px 16px", borderRadius: 10, border: "none", cursor: "pointer", textDecoration: "none" },
  btnPrimary: { background: "#2563EB", color: "#fff" },
  btnGhost: { background: "#F3F4F6", color: "#4B5563" },
  list: { display: "flex", flexDirection: "column", gap: 14 },
  planningItem: { background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 14, padding: 18 },
  itemTitle: { margin: 0, fontSize: 19, fontWeight: 800, color: "#111827" },
  itemSub: { margin: "8px 0 10px 0", fontSize: 16, color: "#6B7280", lineHeight: 1.6 },
  pill: { fontSize: 13, fontWeight: 700, padding: "5px 11px", borderRadius: 999, display: "inline-block", background: "#EFF6FF", color: "#2563EB", marginRight: 6 },
  empty: { textAlign: "center", padding: "34px 20px", color: "#9CA3AF", fontSize: 17 },
};

function TeacherPlanning() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  const allHours = ["08:00-09:00","09:00-10:00","10:00-11:00","11:00-12:00","12:00-13:00","13:00-14:00","14:00-15:00","15:00-16:00","16:00-17:00","17:00-18:00","18:00-19:00","19:00-20:00"];

  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedHour, setSelectedHour] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseType, setCourseType] = useState("cours_essai");
  const [availabilities, setAvailabilities] = useState([]);
  const [timePage, setTimePage] = useState(0);
  const [loading, setLoading] = useState(true);

  const visibleHours = useMemo(() => {
    const start = timePage * 4;
    return allHours.slice(start, start + 4);
  }, [timePage]);

  const maxPage = Math.ceil(allHours.length / 4) - 1;

  const fetchAvailabilities = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/teacher-planning/teacher/${user.id}`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erreur chargement planning");
        return;
      }

      const formatted = data.map((item) => ({
        id: item.id,
        title: item.course_title || "Créneau disponible",
        type: item.course_type || "cours_essai",
        day: item.day_of_week,
        hour: `${item.start_time.slice(0, 5)}-${item.end_time.slice(0, 5)}`,
      }));

      setAvailabilities(formatted);
    } catch {
      alert("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const resetForm = () => {
    setSelectedDays([]);
    setSelectedHour("");
    setCourseTitle("");
    setCourseType("cours_essai");
  };

  const handleAddAvailability = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert("Vous devez être connecté.");
      return;
    }

    if (!courseTitle || !selectedHour || selectedDays.length === 0) {
      alert("Veuillez compléter les informations du créneau.");
      return;
    }

    const [start, end] = selectedHour.split("-");

    try {
      for (const day of selectedDays) {
        const res = await fetch("http://localhost:5000/api/teacher-planning", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            teacher_id: user.id,
            day_of_week: day.toLowerCase(),
            start_time: start,
            end_time: end,
            week_label: null,
            course_title: courseTitle,
            course_type: courseType,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          alert(data.message || "Erreur ajout disponibilité");
          return;
        }
      }

      alert("Disponibilités enregistrées avec succès.");
      resetForm();
      fetchAvailabilities();
    } catch {
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={S.logo}>NOVA<span style={S.logoEm}>DEMY</span></div>
            <span style={S.sbRole}>Professeur</span>
          </div>

          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Principal</span>
            <a style={S.sbLink} href="/teacher/dashboard">🏠 Tableau de bord</a>
            <a style={S.sbLink} href="/teacher/profile">👤 Mon profil</a>
            <a style={S.sbLink} href="/teacher/announcements">📢 Annonces</a>

            <span style={S.sbLabel}>Organisation</span>
            <a style={S.sbLinkActive} href="/teacher/planning">📅 Planning</a>
            <a style={S.sbLink} href="/teacher/requests">📬 Demandes <span style={S.sbBadge}>0</span></a>
            <a style={S.sbLink} href="/chat">💬 Messages <span style={S.sbBadge}>0</span></a>
          </nav>

          <div style={S.sbUser}>
            <div style={S.av}>P</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700 }}>
                {user ? `${user.prenom} ${user.nom}` : "Prénom Nom"}
              </div>
              <div style={{ fontSize: 15, color: "#9CA3AF", marginTop: 2 }}>Professeur</div>
            </div>
          </div>
        </aside>

        <main style={S.main}>
          <p style={S.smallTitle}>Mon planning professeur</p>
          <div style={S.smallSub}>
            Sélectionnez un ou plusieurs jours, puis choisissez un créneau précis.
          </div>

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Créneaux définis</div>
              <div style={S.statValW}>{availabilities.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Jours sélectionnés</div>
              <div style={S.statVal}>{selectedDays.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Cours d’essai</div>
              <div style={S.statVal}>{availabilities.filter((a) => a.type === "cours_essai").length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Cours classiques</div>
              <div style={S.statVal}>{availabilities.filter((a) => a.type === "cours").length}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Ajouter une disponibilité</div>
            <div style={S.noteBox}>
              Chaque jour sélectionné sera enregistré comme un créneau séparé.
            </div>

            <form onSubmit={handleAddAvailability}>
              <div style={S.fieldGrid}>
                <div>
                  <label style={S.label}>Intitulé du cours</label>
                  <input
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    placeholder="Ex : Cours d’essai informatique"
                    style={S.input}
                  />
                </div>

                <div>
                  <label style={S.label}>Type de cours</label>
                  <select value={courseType} onChange={(e) => setCourseType(e.target.value)} style={S.input}>
                    <option value="cours_essai">Cours d’essai</option>
                    <option value="cours">Cours</option>
                  </select>
                </div>
              </div>

              <label style={S.label}>Jours disponibles</label>
              <div style={S.daysRow}>
                {days.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    style={selectedDays.includes(day) ? S.dayBtnActive : S.dayBtn}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <label style={S.label}>Choix du créneau</label>
              <div style={S.timeNav}>
                <button type="button" onClick={() => setTimePage((p) => Math.max(p - 1, 0))} style={S.navBtn}>
                  ← Créneaux précédents
                </button>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#4B5563" }}>
                  Plage horaire {timePage + 1} / {maxPage + 1}
                </div>
                <button type="button" onClick={() => setTimePage((p) => Math.min(p + 1, maxPage))} style={S.navBtn}>
                  Créneaux suivants →
                </button>
              </div>

              <div style={S.timeGrid}>
                {visibleHours.map((hour) => (
                  <button
                    key={hour}
                    type="button"
                    onClick={() => setSelectedHour(hour)}
                    style={selectedHour === hour ? S.slotBtnActive : S.slotBtn}
                  >
                    {hour}
                  </button>
                ))}
              </div>

              <div style={S.btnRow}>
                <button type="submit" style={{ ...S.btn, ...S.btnPrimary }}>Ajouter au planning</button>
                <button type="button" onClick={resetForm} style={{ ...S.btn, ...S.btnGhost }}>Réinitialiser</button>
              </div>
            </form>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Mes disponibilités</div>

            {loading ? (
              <div style={S.empty}>Chargement du planning...</div>
            ) : availabilities.length === 0 ? (
              <div style={S.empty}>Aucune disponibilité ajoutée pour le moment.</div>
            ) : (
              <div style={S.list}>
                {availabilities.map((item) => (
                  <div key={item.id} style={S.planningItem}>
                    <h4 style={S.itemTitle}>{item.title}</h4>
                    <p style={S.itemSub}>
                      {item.day} • {item.hour} • {item.type === "cours_essai" ? "Cours d’essai" : "Cours"}
                    </p>
                    <span style={S.pill}>{item.day}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default TeacherPlanning;