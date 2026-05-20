import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Check, Edit2 } from 'lucide-react'
import CompletionAnimation from '../CompletionAnimation'

const CATEGORIAS = [
  'Cozinha',
  'Banheiro',
  'Quarto',
  'Lavanderia',
  'Limpeza',
  'Organização',
  'Decoração',
  'Compras Urgentes'
]

const PRIORIDADES = ['Baixa', 'Média', 'Alta']

export default function Enxoval({ data, updateData }) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    categoria: CATEGORIAS[0],
    prioridade: 'Média',
    preco: '',
    comprado: false
  })

  const enxoval = data.enxoval || []
  const enxovalComprado = enxoval.filter(item => item.comprado).length
  const percentualCompleto = enxoval.length > 0 ? Math.round((enxovalComprado / enxoval.length) * 100) : 0

  const handleAddOrUpdate = () => {
    if (!formData.nome.trim() || !formData.preco) return

    if (editingId) {
      const novoEnxoval = enxoval.map(item =>
        item.id === editingId ? { ...item, ...formData } : item
      )
      updateData('enxoval', novoEnxoval)
      setEditingId(null)
    } else {
      const novoItem = {
        id: Date.now(),
        ...formData,
        preco: parseFloat(formData.preco)
      }
      updateData('enxoval', [...enxoval, novoItem])
    }

    setFormData({
      nome: '',
      categoria: CATEGORIAS[0],
      prioridade: 'Média',
      preco: '',
      comprado: false
    })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    updateData('enxoval', enxoval.filter(item => item.id !== id))
  }

  const handleEdit = (item) => {
    setFormData({
      nome: item.nome,
      categoria: item.categoria,
      prioridade: item.prioridade,
      preco: item.preco.toString(),
      comprado: item.comprado
    })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleToggleComprado = (id) => {
    const novoEnxoval = enxoval.map(item =>
      item.id === id ? { ...item, comprado: !item.comprado } : item
    )
    updateData('enxoval', novoEnxoval)
  }

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
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  }

  const prioridadeColor = (prioridade) => {
    switch (prioridade) {
      case 'Alta':
        return 'bg-red-500/20 text-red-200 border-red-500/30'
      case 'Média':
        return 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30'
      case 'Baixa':
        return 'bg-green-500/20 text-green-200 border-green-500/30'
      default:
        return 'bg-purple-500/20 text-purple-200'
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto py-8 px-4"
    >
      {/* Mostrar animação de conclusão se 100% */}
      {percentualCompleto === 100 && enxoval.length > 0 && (
        <CompletionAnimation />
      )}

      {/* Título */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display text-purple-neon mb-2">
          Enxoval 🛍️
        </h1>
        <p className="text-purple-light/70">
          Acompanhe todos os itens que vocês irão precisar
        </p>
      </motion.div>

      {/* Barra de progresso */}
      {enxoval.length > 0 && (
        <motion.div variants={itemVariants} className="mb-8 glass rounded-2xl p-6 border border-purple-light/20">
          <div className="flex justify-between items-center mb-3">
            <span className="text-purple-light font-semibold">Progresso: {enxovalComprado} de {enxoval.length}</span>
            <span className="text-purple-neon font-bold text-lg">{percentualCompleto}%</span>
          </div>
          <div className="w-full bg-black/30 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentualCompleto}%` }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-purple-accent to-purple-light h-3 rounded-full"
            />
          </div>
        </motion.div>
      )}

      {/* Botão Adicionar */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          setShowForm(!showForm)
          setEditingId(null)
          setFormData({
            nome: '',
            categoria: CATEGORIAS[0],
            prioridade: 'Média',
            preco: '',
            comprado: false
          })
        }}
        className="w-full mb-8 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-accent to-purple-light hover:shadow-purple-glow-lg text-white font-semibold py-3 rounded-lg transition-all"
      >
        <Plus size={20} />
        {showForm ? 'Cancelar' : 'Adicionar Item'}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Nome do item"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="bg-black/30 border border-purple-light/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-accent"
              />
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="bg-black/30 border border-purple-light/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-accent"
              >
                {CATEGORIAS.map(cat => (
                  <option key={cat} value={cat} className="bg-purple-dark">{cat}</option>
                ))}
              </select>
              <select
                value={formData.prioridade}
                onChange={(e) => setFormData({ ...formData, prioridade: e.target.value })}
                className="bg-black/30 border border-purple-light/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-accent"
              >
                {PRIORIDADES.map(p => (
                  <option key={p} value={p} className="bg-purple-dark">{p}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Preço estimado"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                className="bg-black/30 border border-purple-light/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-accent"
              />
            </div>
            <button
              onClick={handleAddOrUpdate}
              className="w-full mt-4 bg-gradient-to-r from-purple-accent to-purple-light text-white font-semibold py-2 rounded-lg hover:shadow-purple-glow-lg transition-all"
            >
              {editingId ? 'Atualizar Item' : 'Adicionar Item'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de itens por categoria */}
      {enxoval.length > 0 ? (
        <motion.div className="space-y-8">
          {CATEGORIAS.map(categoria => {
            const itensCategoria = enxoval.filter(item => item.categoria === categoria)
            if (itensCategoria.length === 0) return null

            return (
              <motion.div key={categoria} variants={itemVariants}>
                <h2 className="text-xl font-semibold text-purple-light mb-4">{categoria}</h2>
                <motion.div layout className="grid grid-cols-1 gap-3">
                  <AnimatePresence mode="popLayout">
                    {itensCategoria.map(item => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        layout
                        className={`glass rounded-xl p-4 border border-purple-light/20 flex items-center justify-between ${
                          item.comprado ? 'bg-purple-accent/10' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleToggleComprado(item.id)}
                            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                              item.comprado
                                ? 'bg-purple-accent border-purple-accent'
                                : 'border-purple-light hover:border-purple-accent'
                            }`}
                          >
                            {item.comprado && <Check size={16} className="text-white" />}
                          </motion.button>
                          <div className="flex-1">
                            <p className={`font-semibold ${item.comprado ? 'text-purple-light/60 line-through' : 'text-white'}`}>
                              {item.nome}
                            </p>
                            <div className="flex gap-2 mt-1">
                              <span className={`text-xs px-2 py-1 rounded border ${prioridadeColor(item.prioridade)}`}>
                                {item.prioridade}
                              </span>
                              {item.comprado && (
                                <span className="text-xs px-2 py-1 rounded border border-green-500/30 bg-green-500/10 text-green-200">
                                  Comprado ✓
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-purple-neon font-semibold">R$ {item.preco.toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 ml-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEdit(item)}
                            className="text-purple-light hover:text-purple-neon transition-colors"
                          >
                            <Edit2 size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(item.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} className="text-center py-12">
          <p className="text-purple-light/60 text-lg">Nenhum item adicionado ainda</p>
          <p className="text-purple-light/40 text-sm">Adicione itens para começar a organizar o enxoval</p>
        </motion.div>
      )}
    </motion.div>
  )
}
