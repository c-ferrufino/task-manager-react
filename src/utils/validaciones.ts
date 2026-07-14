export function esTextoTareaValido(texto: string): boolean {
  return texto.trim() !== ''
}

export function contarTareasPendientes(tareas: { completed: boolean }[]): number {
  return tareas.filter((t) => !t.completed).length
}
