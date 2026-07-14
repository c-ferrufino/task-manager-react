import { test, expect } from '@playwright/test'

test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
  const texto = `Ir al gimnasio ${Date.now()}`

  // 1. Entrar a la aplicación
  await page.goto('/')

  // 2. Crear una tarea
  await page.getByLabel('Nueva tarea').fill(texto)
  await page.getByRole('button', { name: 'Agregar' }).click()

  // 3. Verla en la lista
  await expect(page.getByText(texto)).toBeVisible()
})
