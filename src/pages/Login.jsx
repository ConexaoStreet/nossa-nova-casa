import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Lock } from 'lucide-react'

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const correctPassword = '1704'

  const handleLogin = (e) => {
    e.preventDefault()
    
    if (password === correctPassword) {
      localStorage.setItem('nossaCasaAuth', 'true')
      onLogin()
    } else {
      setError('Ops… esse cantinho é só da Lupyta e do Vítor 💜')
      setPassword('')
      setTimeout(() => setError(''), 4000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-purple-accent"
          >
            <Heart size={48} className="fill-purple-accent" />
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-display text-center mb-2 text-purple-neon"
        >
          Nossa Nova Casa
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-center text-purple-light text-lg mb-4"
        >
          Coremas PB
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="text-center mb-8"
        >
          <p className="text-white text-2xl font-display">Lupyta & Vítor</p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-accent to-purple-light mx-auto mt-2 rounded-full"></div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass rounded-2xl p-8 border border-purple-light/20 backdrop-blur-xl"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <label className="block text-purple-light text-sm font-medium mb-2">
                PIN de acesso
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-black/30 border border-purple-light/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-accent transition-colors"
                  maxLength="4"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-light hover:text-purple-neon transition-colors"
                >
                  <Lock size={20} />
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-accent to-purple-light hover:shadow-purple-glow-lg text-white font-semibold py-3 rounded-lg transition-all duration-300"
            >
              Entrar no nosso cantinho 💜
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-8 text-purple-light/60 text-sm"
        >
          <p>Espaço exclusivo do casal</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed top-10 right-10 w-32 h-32 bg-purple-accent/10 rounded-full blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="fixed bottom-10 left-10 w-40 h-40 bg-purple-light/10 rounded-full blur-3xl"
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </div>
  )
}
