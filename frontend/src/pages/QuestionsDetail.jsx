import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { getQuestionById } from "../services/api";
import Navbar from "../components/Navbar";
import Editor from "@monaco-editor/react";
import axios from "axios";
import "../styles/questionsDetail.css";
import { LANGUAGES , TEMPLATES } from "../constants/editorTemplates";
function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [leftWidth, setLeftWidth] = useState(50);
  const isChangingLanguage = useRef(false);


  // ✅ LOAD QUESTION
  useEffect(() => {
    getQuestionById(id)
      .then((res) => setQuestion(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // ✅ LOAD CODE (FIXED TEMPLATE LOGIC)
  useEffect(() => {
    isChangingLanguage.current = true;

    const key = `code_${id}_${language}`;
    const savedCode = localStorage.getItem(key);

    let toLoad;
    if (savedCode && savedCode.trim() !== "") {
      toLoad = savedCode;
    } else {
      toLoad = TEMPLATES[language] ?? "";
      localStorage.setItem(key, toLoad); // store template initially
    }

    setCode(toLoad);

    setTimeout(() => {
      isChangingLanguage.current = false;
    }, 0);
  }, [id, language]);

  // ✅ SAVE CODE (FIXED DEPENDENCIES)
  useEffect(() => {
    if (isChangingLanguage.current) return;
    localStorage.setItem(`code_${id}_${language}`, code);
  }, [code, id, language]);

  // ✅ LANGUAGE CHANGE
  const handleLanguageChange = (lang) => {
    const savedCode = localStorage.getItem(`code_${id}_${language}`);
    const isModified =
      savedCode !== null &&
      savedCode !== (TEMPLATES[language] ?? "");

    if (isModified) {
      const confirmSwitch = window.confirm(
        "Switch language? Your code is saved and will be restored."
      );
      if (!confirmSwitch) return;
    }

    setLanguage(lang);
  };

  // ✅ RESET TEMPLATE
  const handleReset = () => {
    const confirmReset = window.confirm("Reset to default template?");
    if (!confirmReset) return;

    const template = TEMPLATES[language] ?? "";
    setCode(template);
    localStorage.setItem(`code_${id}_${language}`, template);
  };

  // ✅ RESIZE
  const handleDrag = useCallback((e) => {
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 20 && newWidth < 80) setLeftWidth(newWidth);
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleDrag]);

  const handleMouseDown = useCallback(() => {
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleMouseUp);
  }, [handleDrag, handleMouseUp]);

  // ✅ SUBMIT
  const handleSubmit = () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("Please login first");
      return;
    }

    axios
      .post("http://localhost:8000/attempts", {
        user_id: userId,
        question_id: id,
        status: "solved",
      })
      .then(() => alert("✅ Submitted successfully!"))
      .catch(() => alert("❌ Submission failed"));
  };

  // ✅ RUN (MOCK)
  const handleRun = () => {
    console.log(code);
    alert("🚀 Code executed (mock)");
  };

  if (!question) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="detail-container">

        {/* LEFT */}
        <div className="question-left" style={{ width: `${leftWidth}%` }}>
          <h2>{question.title}</h2>
          <div className="meta">
            <span className={`difficulty ${question.difficulty.toLowerCase()}`}>
              {question.difficulty}
            </span>
            <span className="company">{question.company}</span>
          </div>
          <p className="description">{question.description}</p>
        </div>

        {/* RESIZER */}
        <div className="resizer" onMouseDown={handleMouseDown} />

        {/* RIGHT */}
        <div className="editor-right">
          <div className="editor-header">
            <select
              className="language-select"
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>

            <div className="editor-actions">
              <button onClick={handleReset}>Reset</button>
              <button className="run-btn" onClick={handleRun}>Run</button>
              <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value ?? "")}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionDetail;