import '../css/menu.css'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Avatar from '@mui/material/Avatar'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { ChangeEvent, useState } from 'react'
import { useGetProductsByNameQuery } from '../store/serviceApi/product.api'
import { Link } from 'react-router-dom'

export function Menu({ ...props }) {
	const [inputValue, setInputValue] = useState('')

	const { data } = useGetProductsByNameQuery(inputValue, {
		skip: !inputValue
	})
	const handleSearch = (value: string) => {
		props.setSearchValue(value)
	}

	const [changeFlag, setChangeFlag] = useState(false)
	return (
		<div className="menu">
			<Link
				to="/"
				className="logo"
				onClick={() => {
					setInputValue('')
				}}
			></Link>
			<div className="main16px">
				<Link className="normal-text" to="catalog">
					<Button
						variant="contained"
						className="button-catalog"
						startIcon={<MenuIcon className="burger" />}
						onClick={() => {
							setInputValue('')
						}}
					>
						Каталог
					</Button>
				</Link>
				<div className="search-output">
					<div className="search" id="searchField">
						<InputBase
							autoComplete="off"
							id="searchInput"
							className="search-input"
							placeholder="Найти товар"
							value={inputValue}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setInputValue(e.currentTarget.value)
								setChangeFlag(false)
							}}
						/>
						<Link to="/search">
							<IconButton
								type="button"
								className="search-icon"
								onClick={() => {
									handleSearch(inputValue)
									setChangeFlag(true)
								}}
							>
								<SearchIcon />
							</IconButton>
						</Link>
					</div>
					{!changeFlag && inputValue && data !== undefined && data.length !== 0 && (
						<div
							className="box max-h-40 overflow-auto border-x border-solid border-secondary"
							id="boxElement"
						>
							{data.map(({ name, id }) => {
								return (
									<div
										className="item hover:border-y border-solid border-secondary"
										key={id}
										onClick={() => {
											setInputValue(name)
											setChangeFlag(true)
										}}
									>
										<div>{name}</div>
									</div>
								)
							})}
						</div>
					)}
				</div>
			</div>
			<div className="main24px ">
				<Link
					to="/favorite"
					className="favorite normal-text"
					onClick={() => {
						setInputValue('')
					}}
				>
					<div className="favorite-icon"></div>
					Избранное
				</Link>
				<Link
					to="/"
					className="order normal-text"
					onClick={() => {
						setInputValue('')
					}}
				>
					<div className="order-icon"></div>
					Заказы
				</Link>
				<Link
					to="/shopping_cart"
					className="shopping-cart normal-text"
					onClick={() => {
						setInputValue('')
					}}
				>
					<div className="shopping-cart-icon"></div>
					Корзина
				</Link>
				<div className="nameblock">
					<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
					<div className="user-name">Алексей</div>
					<IconButton type="button" className="user-menu">
						<KeyboardArrowDownIcon />
					</IconButton>
				</div>
			</div>
		</div>
	)
}
