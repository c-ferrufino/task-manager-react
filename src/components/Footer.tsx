function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>Task Manager &copy; {year} UCB</p>
    </footer>
  )
}

export default Footer
