import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    Filter,
    Active,
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

interface PageData {
    incomplete_results: boolean
    items: Array<object>
    total_count: number
}

export const App = () => {
    const [query, setQuery] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [users, setUsers] = useState<Array<object>>([])
    const [totalPage, setTotalPage] = useState<number>(1)
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const [active, setActive] = useState<boolean>(true)
    const [order, setOrder] = useState<'desc' | 'asc'>('desc')
    const [isDisable, setIsDisable] = useState<boolean>(true)

    useEffect((): void => {
        if (query?.length !== 0) {
            setIsDisable(false)
        } else {
            setIsDisable(true)
        }
    }, [query])

    const handleSearch = async (page = 1, order = 'desc'): Promise<void> => {
        setIsLoad(true)
        try {
            const data: PageData = await getUsers(query, page, order)
            setUsers(data.items)
            setTotalPage(Math.ceil(data.total_count / 30))
            setIsLoad(false)
        } catch (error) {
            alert(error)
        } finally {
            setIsLoad(false)
            setIsDisable(true)
        }
    }

    const handlePrev = async (): Promise<void> => {
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

    const handleNext = async (): Promise<void> => {
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

    const handleCopy = (e: React.ClipboardEvent<HTMLInputElement>) => {
        console.log('copied')
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
                onCopy={handleCopy}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setQuery(e.target.value)
                }}
            />

            <button
                style={
                    isDisable ? { color: '#999999', pointerEvents: 'none' } : {}
                }
                onClick={() => {
                    setPage(1)
                    setActive(true)
                    handleSearch()
                }}
            >
                Search
            </button>
            {users.length !== 0 && (
                <Filter>
                    <FilterTitle>Repositories:</FilterTitle>
                    <FilterButtons>
                        <Active
                            $active={!active}
                            onClick={() => {
                                setActive(false)
                                setOrder('asc')
                                handleSearch(page, 'asc')
                            }}
                        >
                            по возрастанию
                        </Active>
                        <Active
                            $active={active}
                            onClick={() => {
                                setActive(true)
                                setOrder('desc')
                                handleSearch(page, 'desc')
                            }}
                        >
                            по убыванию
                        </Active>
                    </FilterButtons>
                </Filter>
            )}
            <ul>
                {users?.map((el: any) => <ItemUser item={el} key={el['id']} />)}
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
