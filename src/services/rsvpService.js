export function submitRSVP(formData) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        ok: true,
        submittedAt: new Date().toISOString(),
        data: formData,
      })
    }, 900)
  })
}
