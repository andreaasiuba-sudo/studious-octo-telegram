"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "¿Cuál es el río que atraviesa esta ciudad?",
    options: ["Danubio", "Moldava", "Elba", "Rin"],
    correctAnswer: 1,
    hint: "Es un río que suena similar a una región vinícola famosa..."
  },
  {
    id: 2,
    question: "¿Cuál es el dulce tradicional que se cocina al fuego en las calles?",
    options: ["Trdelník", "Macaron francés", "Ćevapi", "Goulash"],
    correctAnswer: 0,
    hint: "Tiene forma de cilindro y suele estar cubierto de azúcar y canela..."
  },
  {
    id: 3,
    question: "¿Cuál es la cerveza más famosa de esta ciudad?",
    options: ["Heineken", "Stella Artois", "Pilsner Urquell", "Budweiser"],
    correctAnswer: 2,
    hint: "Es el lugar donde nació el estilo de cerveza 'Pilsner'..."
  },
  {
    id: 4,
    question: "¿Por qué apodo es conocida mundialmente esta ciudad?",
    options: ["La Ciudad de la Luz", "La Ciudad Eterna", "La Ciudad Dorada", "La Ciudad de los Canales"],
    correctAnswer: 2,
    hint: "Se debe al reflejo del sol en las torres y cúpulas de sus iglesias..."
  },
  {
    id: 5,
    question: "¿En qué país se encuentra esta misteriosa ciudad?",
    options: ["Austria", "Hungría", "República Checa", "Eslovaquia"],
    correctAnswer: 2,
    hint: "Un país que se independizó pacíficamente en 1993..."
  }
];

interface PragueQuizProps {
  onComplete: () => void;
}

export default function PragueQuiz({ onComplete }: PragueQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const skipToEnd = () => {
    setCurrentQuestion(questions.length);
    setCorrectAnswers(questions.length); // Todas correctas para la celebración completa
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setCorrectAnswers(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setShowHint(false);
      } else {
        // Quiz completado - incrementar para mostrar la celebración
        setCurrentQuestion(prev => prev + 1);
        // Eliminado el onComplete automático para que la celebración se quede
      }
    }, 2000);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (currentQuestion >= questions.length) {
    return (
      <div className="fixed inset-0 bg-[#FFF9F5] z-[100] overflow-hidden flex items-center justify-center">
        {/* Confetti & Floating Hearts (Fondo) */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`confetti-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: ['#D4A373', '#B7B7A4', '#E8E2DE', '#FFE8D6'][i % 4],
                left: `${Math.random() * 100}%`,
                top: `-20px`,
              }}
              animate={{
                y: [0, 1000],
                rotate: [0, 360],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Contenido Principal en única vista */}
        <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center justify-center gap-6 md:gap-10">
          
          {/* Header de Celebración - Más compacto */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.span 
              className="font-sans text-[10px] tracking-[0.4em] text-accent uppercase mb-2 block"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Destino Revelado
            </motion.span>
            <h1 className="font-serif text-6xl md:text-8xl text-foreground mb-2 tracking-tighter leading-none">
              ¡PRAGA!
            </h1>
            <p className="font-serif text-lg md:text-xl text-muted italic">
              Del 22 al 26 de Abril 2026
            </p>
          </motion.div>

          {/* Map Widget Pequeño y Centrado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="w-full max-w-3xl aspect-[21/7] bg-white/60 backdrop-blur-md rounded-3xl border border-accent/10 shadow-xl overflow-hidden relative group"
          >
            {/* SVG Map Background */}
            <svg viewBox="0 0 1000 300" className="w-full h-full opacity-50">
              {/* Línea de Trayecto Curva Animada */}
              <motion.path
                d="M300,150 Q500,50 700,150"
                fill="none"
                stroke="#D4A373"
                strokeWidth="1.5"
                strokeDasharray="6,4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, delay: 1, ease: "easeInOut" }}
              />

              {/* Punto Amsterdam */}
              <g>
                <circle cx="300" cy="150" r="3" fill="#3D3D33" />
                <text x="300" y="175" textAnchor="middle" className="text-[10px] font-sans tracking-widest uppercase fill-muted">Ámsterdam</text>
              </g>

              {/* Punto Praga con Pulso */}
              <g>
                <motion.circle
                  cx="700"
                  cy="150"
                  r="10"
                  fill="#D4A373"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <circle cx="700" cy="150" r="4" fill="#D4A373" />
                <text x="700" y="175" textAnchor="middle" className="text-[10px] font-serif italic fill-foreground">Praga</text>
              </g>

              {/* Avión siguiendo la ruta */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 4, delay: 1, repeat: Infinity }}
              >
                <text className="text-xl">✈️</text>
                <animateMotion
                  path="M300,150 Q500,50 700,150"
                  dur="4s"
                  repeatCount="indefinite"
                  rotate="auto"
                />
              </motion.g>
            </svg>

            {/* Labels de Origen/Destino simplificados */}
            <div className="absolute inset-x-12 inset-y-0 flex items-center justify-between pointer-events-none">
              <div className="text-left">
                <span className="block text-[8px] tracking-[0.2em] text-muted uppercase">Origen</span>
                <span className="font-serif text-xl text-foreground">Ámsterdam</span>
              </div>
              <div className="text-right">
                <span className="block text-[8px] tracking-[0.2em] text-muted uppercase">Destino</span>
                <span className="font-serif text-xl text-foreground">Praga, CZ</span>
              </div>
            </div>
          </motion.div>

          {/* Cards de Información - Más compactas */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-3xl">
            {[
              { icon: "👫", title: "Nosotros", desc: "Viaje para dos" },
              { icon: "🐕", title: "+ Natillas", desc: "🐾" },
              { icon: "🏰", title: "Destino", desc: "Ciudad Dorada" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="bg-white/30 p-5 rounded-2xl border border-accent/5 text-center shadow-sm"
              >
                <span className="text-3xl mb-2 block">{item.icon}</span>
                <h3 className="font-serif text-lg text-foreground leading-none mb-1">{item.title}</h3>
                <p className="font-sans text-[10px] text-muted uppercase tracking-wider">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Pie de Celebración - Sin scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="flex gap-6 items-center">
              {["🥐", "🍺", "🌉", "❤️"].map((icon, i) => (
                <motion.span 
                  key={i} 
                  className="text-2xl"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                >
                  {icon}
                </motion.span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 relative">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl text-foreground">
          🏰 Descubre tu Destino Misterioso
        </h2>
      </div>

      {/* Botón para saltar */}
      <button
        onClick={skipToEnd}
        className="absolute top-0 right-0 text-xs text-muted/50 hover:text-muted transition-colors px-2 py-1 rounded hover:bg-border/20"
        title="Saltar al final"
      >
        ⏭️ Saltar
      </button>

      {/* Barra de progreso */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted">
          <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-foreground"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Pregunta */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="font-serif text-2xl text-foreground text-center">
            {questions[currentQuestion].question}
          </h2>

          {/* Opciones */}
          <div className="grid gap-3">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                whileHover={!showResult ? { scale: 1.02 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                className={`p-4 text-left border rounded-lg transition-all duration-300 ${
                  showResult
                    ? index === questions[currentQuestion].correctAnswer
                      ? "border-green-500 bg-green-50 text-green-700"
                      : selectedAnswer === index
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-border bg-background text-muted"
                    : selectedAnswer === index
                    ? "border-foreground bg-foreground/5"
                    : "border-border hover:border-foreground/50"
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>

          {/* Resultado */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-2"
              >
                {isCorrect ? (
                  <p className="text-green-600 font-medium">¡Correcto! ✅</p>
                ) : (
                  <p className="text-red-600 font-medium">Incorrecto ❌</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón de pista */}
          {!showResult && (
            <div className="text-center">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {showHint ? "Ocultar pista" : "💡 Mostrar pista"}
              </button>
              
              <AnimatePresence>
                {showHint && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-muted italic mt-2"
                  >
                    {questions[currentQuestion].hint}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
