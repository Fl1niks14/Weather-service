import { useEffect, useState } from 'react'
import './ThemeToggle.css'
const ThemeToggle = () => {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
		const initialTheme = savedTheme || 'light'
		setTheme(initialTheme)
		document.documentElement.className = initialTheme
	}, [])

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
		document.documentElement.className = newTheme
		localStorage.setItem('theme', newTheme)
	}

	return (
		<label className='switch'>
			<input
				type='checkbox'
				checked={theme === 'dark'}
				onChange={toggleTheme}
			/>
			<span className='slider'></span>
		</label>
	)
}

export default ThemeToggle
