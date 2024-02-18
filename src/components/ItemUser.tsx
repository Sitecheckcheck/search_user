import React from 'react'
import { useState } from 'react'
import format from 'date-fns/format'
import {
    UserInfoBox,
    ItemUserInfo,
    UserInfo,
    ItemUserStyle,
    AvatarUser,
} from './itemUser.styled'
import { getAboutUser } from '../api/api'

interface ItemUserProps {
    item: any
}
export const ItemUser = ({ item }: ItemUserProps) => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<any>()
    const [isLoad, setIsLoad] = useState(false)
    const handleShowUser = async () => {
        if (!isShow) {
            setIsLoad(true)
            try {
                const data = await getAboutUser(item?.login)
                setUserInfo(data)
                setIsShow(!isShow)
            } catch (error) {
                alert(error)
            } finally {
                setIsLoad(false)
            }
        } else {
            setIsShow(!isShow)
        }
    }

    return isLoad ? (
        <UserInfoBox>
            <p>Loading...</p>
        </UserInfoBox>
    ) : isShow ? (
        <UserInfoBox>
            <ItemUserInfo onClick={handleShowUser}>{item.login}</ItemUserInfo>
            <AvatarUser src={item.avatar_url} alt="avatar"></AvatarUser>
            <UserInfo>repositories: {userInfo.public_repos}</UserInfo>
            <UserInfo>
                registrated at{' '}
                {format(new Date(userInfo.created_at), 'dd.MM.yyyy')}
            </UserInfo>
        </UserInfoBox>
    ) : (
        <ItemUserStyle onClick={handleShowUser}>{item.login}</ItemUserStyle>
    )
}
