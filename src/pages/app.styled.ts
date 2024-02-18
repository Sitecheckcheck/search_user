import styled from 'styled-components'

export const Filter = styled.div`
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1rem auto 0.5rem;
`

export const FilterTitle = styled.p`
    width: 100px;
`

export const FilterButtons = styled.div`
    width: 200px;
    display: flex;
    gap: 5px;
`

export const Activ = styled.button<{ $activ: boolean }>`
    border: ${({ $activ }) => $activ && '2px solid black'};
`

export const Loading = styled.h1`
    text-align: center;
    margin: 4rem 0;
`

export const Pagination = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
    justify-content: center;
`

export const AppStyle = styled.div`
    text-align: center;
`

export const Input = styled.input`
    margin: 0.4rem 5px;
`

export const Label = styled.label`
    display: block;
    font:
        1rem 'Fira Sans',
        sans-serif;
    margin: 0.4rem 5px;
`
