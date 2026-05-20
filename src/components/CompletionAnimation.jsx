import { motion } from 'framer-motion'

export default function CompletionAnimation() {
  const particlesCount = 50

  const Particle = ({ delay, duration }) => (
    <motion.div
      key={delay}
      className="fixed w-2 h-2 rounded-full pointer-events-none"
      style={{
        background: `hsl(${270 + Math.random() * 60}, 100%, 60%)`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      initial={{ opacity: 0, scale: 1, y: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        y: [-200 - Math.random() * 300, 200 + Math.random() * 300],
        x: [-150 + Math.random() * 300, 150 - Math.random() * 300],
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: 'easeOut',
      }}
    />
  )

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
      {/* Fundo escuro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black"
        onClick={() => window.location.reload()}
      />

      {/* Partículas */}
      {Array.from({ length: particlesCount }).map((_, i) => (
        <Particle key={i} delay={i * 0.05} duration={2 + Math.random()} />
      ))}

      {/* Conteúdo central */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="text-6xl mb-6 inline-block"
        >
          💜
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-6xl font-display text-purple-neon mb-4"
        >
          Enxoval Concluído! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-2xl text-purple-light mb-8 font-display"
        >
          Lupyta e Vítor estão mais perto<br />da nova casa em Coremas PB
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-purple-accent to-purple-light text-white font-semibold py-3 px-8 rounded-lg hover:shadow-purple-glow-lg transition-all"
        >
          Continuar Planejando
        </motion.button>

        {/* Corações discretos */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: 0.5 + i * 0.3,
              repeat: Infinity,
            }}
            className="absolute text-3xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + Math.sin(i) * 20}%`,
            }}
          >
            💜
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
