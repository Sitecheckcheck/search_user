import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    Filter,
    Activ,
    Loading,
    Pagination,
    AppStyle,
    Input,
    Label,
    FilterTitle,
    FilterButtons,
} from './app.styled'
import { ItemUser } from '../components/ItemUser'
import { GlobalStyle } from '../globalStyles'
import { getUsers } from '../api/api'

export const App = () => {
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [users, setUsers] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [isLoad, setIsLoad] = useState(false)
    const [activ, setactiv] = useState(true)
    const [order, setOrdrer] = useState('desc')
    const [isDisable, setIsDisable] = useState(true)

    useEffect(() => {
        if (query?.length !== 0) {
            setIsDisable(false)
        } else {
            setIsDisable(true)
        }
    }, [query])

    const handleSearch = async (page = 1, order = 'desc') => {
        setIsLoad(true)
        try {
            const data = await getUsers(query, page, order)
            setUsers(data.items)
            setTotalPage(Math.ceil(data.total_count / 30))
            setIsLoad(false)
        } catch (error) {
            alert(error)
        } finally {
            setIsLoad(false)
        }
    }

    const handlePrev = async () => {
        if (page !== 1) {
            setIsLoad(true)
            try {
                const data = await getUsers(query, page - 1, order)
                setUsers(data.items)
                setPage(page - 1)
                setIsLoad(false)
            } catch (error) {
                alert(error)
            } finally {
                setIsLoad(false)
            }
        }
    }

    const handleNext = async () => {
        if (page !== totalPage) {
            setIsLoad(true)
            try {
                const data = await getUsers(query, page + 1, order)
                setUsers(data.items)
                setPage(page + 1)
                setIsLoad(false)
            } catch (error) {
                alert(error)
            } finally {
                setIsLoad(false)
            }
        }
    }

    return isLoad ? (
        <Loading>Loading...</Loading>
    ) : (
        <AppStyle>
            <GlobalStyle />
            <Label htmlFor="site-search">Search the user:</Label>
            <Input
                type="search"
                id="site-search"
                name="q"
                onChange={(e) => {
                    setQuery(e.target.value)
                }}
            />

            <button
                style={
                    isDisable ? { color: '#999999', pointerEvents: 'none' } : {}
                }
                onClick={() => {
                    setPage(1)
                    setactiv(true)
                    handleSearch()
                }}
            >
                Search
            </button>
            {users.length !== 0 && (
                <Filter>
                    <FilterTitle>Repositiries:</FilterTitle>
                    <FilterButtons>
                        <Activ
                            $activ={!activ}
                            onClick={() => {
                                setactiv(false)
                                setOrdrer('asc')
                                handleSearch(page, 'asc')
                            }}
                        >
                            по возрастанию
                        </Activ>
                        <Activ
                            $activ={activ}
                            onClick={() => {
                                setactiv(true)
                                setOrdrer('desc')
                                handleSearch(page, 'desc')
                            }}
                        >
                            по убыванию
                        </Activ>
                    </FilterButtons>
                </Filter>
            )}
            <ul>
                {users?.map((el) => (
                    <ItemUser item={el} key={el.id} />
                ))}
            </ul>
            {users.length !== 0 && (
                <Pagination>
                    <button onClick={() => handlePrev()}>prev</button>
                    <p>
                        {page} from {totalPage}
                    </p>
                    <button onClick={() => handleNext()}>next</button>
                </Pagination>
            )}
        </AppStyle>
    )
}
