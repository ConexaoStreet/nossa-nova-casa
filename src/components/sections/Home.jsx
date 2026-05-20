import { motion } from 'framer-motion'
import { Heart, Home, ShoppingBag, Zap } from 'lucide-react'

export default function Home({ data }) {
  const enxovalComprado = data.enxoval.filter(item => item.comprado).length
  const enxovalTotal = data.enxoval.length
  const percentualEnxoval = enxovalTotal > 0 ? Math.round((enxovalComprado / enxovalTotal) * 100) : 0

  const metasPercentual = data.metas.total > 0 ? Math.round((data.metas.juntado / data.metas.total) * 100) : 0

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto py-8 px-4"
    >
      {/* Saudação */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display text-purple-neon mb-2">
          Bem-vindos ao nosso futuro lar 💜
        </h1>
        <p className="text-purple-light text-lg">
          Cada item marcado é um passo mais perto da nossa vida juntos.
        </p>
      </motion.div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Card Enxoval */}
        <motion.div
          variants={itemVariants}
          className="glass rounded-2xl p-6 border border-purple-light/20 backdrop-blur-xl hover:shadow-purple-glow transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-light font-semibold">Enxoval</h3>
            <ShoppingBag className="text-purple-accent" size={24} />
          </div>
          <p className="text-white text-2xl font-bold mb-1">{enxovalComprado}</p>
          <p className="text-purple-light/60 text-sm">de {enxovalTotal} itens</p>
          <div className="w-full bg-black/30 rounded-full h-2 mt-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentualEnxoval}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-gradient-to-r from-purple-accent to-purple-light h-2 rounded-full"
            />
          </div>
          <p className="text-purple-neon text-xs mt-2">{percentualEnxoval}% completo</p>
        </motion.div>

        {/* Card Metas */}
        <motion.div
          variants={itemVariants}
          className="glass rounded-2xl p-6 border border-purple-light/20 backdrop-blur-xl hover:shadow-purple-glow transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-light font-semibold">Metas</h3>
            <Zap className="text-purple-accent" size={24} />
          </div>
          <p className="text-white text-2xl font-bold mb-1">R$ {data.metas.juntado}</p>
          <p className="text-purple-light/60 text-sm">de R$ {data.metas.total}</p>
          <div className="w-full bg-black/30 rounded-full h-2 mt-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${metasPercentual}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-gradient-to-r from-purple-accent to-purple-light h-2 rounded-full"
            />
          </div>
          <p className="text-purple-neon text-xs mt-2">{metasPercentual}% juntado</p>
        </motion.div>

        {/* Card Falta Juntar */}
        <motion.div
          variants={itemVariants}
          className="glass rounded-2xl p-6 border border-purple-light/20 backdrop-blur-xl hover:shadow-purple-glow transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-light font-semibold">Falta Juntar</h3>
            <Heart className="text-purple-accent" size={24} />
          </div>
          <p className="text-white text-2xl font-bold mb-1">R$ {Math.max(0, data.metas.total - data.metas.juntado)}</p>
          <p className="text-purple-light/60 text-sm">para atingir meta</p>
          <div className="mt-4 text-purple-neon text-sm font-semibold">
            Continue juntando! 💪
          </div>
        </motion.div>

        {/* Card Pendentes */}
        <motion.div
          variants={itemVariants}
          className="glass rounded-2xl p-6 border border-purple-light/20 backdrop-blur-xl hover:shadow-purple-glow transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-light font-semibold">Pendentes</h3>
            <Home className="text-purple-accent" size={24} />
          </div>
          <p className="text-white text-2xl font-bold mb-1">{Math.max(0, enxovalTotal - enxovalComprado)}</p>
          <p className="text-purple-light/60 text-sm">itens a comprar</p>
          <div className="mt-4 text-purple-neon text-sm font-semibold">
            Vamos lá! 🛍️
          </div>
        </motion.div>
      </div>

      {/* Frase inspiradora */}
      <motion.div
        variants={itemVariants}
        className="glass rounded-2xl p-8 border border-purple-light/20 backdrop-blur-xl text-center"
      >
        <p className="text-purple-neon text-xl font-display mb-2">
          "Cada pequeno passo nos aproxima do sonho de morar juntos"
        </p>
        <p className="text-purple-light/70">- Lupyta & Vítor</p>
      </motion.div>
    </motion.div>
  )
}
