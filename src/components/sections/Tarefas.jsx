import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Check } from 'lucide-react'

export default function Tarefas({ data, updateData }) {
  const [showForm, setShowForm] = useState(false)
  const [titarefa, setTitarefa] = useState('')

  const tarefas = data.tarefas || [
    { id: 1, titulo: 'Fazer ENCCEJA', concluida: false },
    { id: 2, titulo: 'Arrumar emprego', concluida: false },
    { id: 3, titulo: 'Guardar dinheiro', concluida: false },
    { id: 4, titulo: 'Comprar itens pequenos', concluida: false },
    { id: 5, titulo: 'Organizar mudança', concluida: false },
    { id: 6, titulo: 'Planejar moradia em Coremas PB', concluida: false },
  ]

  const handleAddTarefa = () => {
    if (!titarefa.trim()) return

    const novaTarefa = {
      id: Date.now(),
      titulo: titarefa,
      concluida: false
    }
    updateData('tarefas', [...tarefas, novaTarefa])
    setTitarefa('')
    setShowForm(false)
  }

  const handleToggleTarefa = (id) => {
    const novasTarefas = tarefas.map(t =>
      t.id === id ? { ...t, concluida: !t.concluida } : t
    )
    updateData('tarefas', novasTarefas)
  }

  const handleDeleteTarefa = (id) => {
    updateData('tarefas', tarefas.filter(t => t.id !== id))
  }

  const tarefasConc = tarefas.filter(t => t.concluida).length
  const percentual = tarefas.length > 0 ? Math.round((tarefasConc / tarefas.length) * 100) : 0

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto py-8 px-4"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display text-purple-neon mb-2">
          Prioridades do Mês 🎯
        </h1>
        <p className="text-purple-light/70">
          Acompanhe as tarefas mais importantes
        </p>
      </motion.div>

      {/* Progresso */}
      {tarefas.length > 0 && (
        <motion.div variants={itemVariants} className="mb-8 glass rounded-2xl p-6 border border-purple-light/20">
          <div className="flex justify-between items-center mb-3">
            <span className="text-purple-light font-semibold">Progresso: {tarefasConc} de {tarefas.length}</span>
            <span className="text-purple-neon font-bold">{percentual}%</span>
          </div>
          <div className="w-full bg-black/30 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentual}%` }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-purple-accent to-purple-light h-2 rounded-full"
            />
          </div>
        </motion.div>
      )}

      {/* Botão adicionar */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowForm(!showForm)}
        className="w-full mb-8 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-accent to-purple-light text-white font-semibold py-3 rounded-lg transition-all"
      >
        <Plus size={20} />
        {showForm ? 'Cancelar' : 'Adicionar Tarefa'}
      </motion.button>

      {/* Formulário */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-8 glass rounded-2xl p-6 border border-purple-light/20"
          >
            <input
              type="text"
              placeholder="Digite a tarefa"
              value={titarefa}
              onChange={(e) => setTitarefa(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTarefa()}
              className="w-full bg-black/30 border border-purple-light/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-accent mb-4"
            />
            <button
              onClick={handleAddTarefa}
              className="w-full bg-gradient-to-r from-purple-accent to-purple-light text-white font-semibold py-2 rounded-lg"
            >
              Adicionar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de tarefas */}
      <motion.div layout className="space-y-2">
        <AnimatePresence mode="popLayout">
          {tarefas.map(tarefa => (
            <motion.div
              key={tarefa.id}
              variants={itemVariants}
              layout
              className={`glass rounded-xl p-4 border border-purple-light/20 flex items-center gap-4 ${
                tarefa.concluida ? 'bg-purple-accent/10' : ''
              }`}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleToggleTarefa(tarefa.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  tarefa.concluida
                    ? 'bg-purple-accent border-purple-accent'
                    : 'border-purple-light hover:border-purple-accent'
                }`}
              >
                {tarefa.concluida && <Check size={16} className="text-white" />}
              </motion.button>
              <p className={`flex-1 ${tarefa.concluida ? 'text-purple-light/60 line-through' : 'text-white'}`}>
                {tarefa.titulo}
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDeleteTarefa(tarefa.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={18} />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
