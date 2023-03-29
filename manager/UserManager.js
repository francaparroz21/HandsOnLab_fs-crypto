import fs from 'fs';
import crypto from 'crypto';

const path = './files/Users.json'

export default class UserManager {

    constructor(path) {
        this.path = path
    }

    getUsers = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        }
        return []
    }

    createUser = async user => {
        const users = await this.getUsers()
        user.keyWord = crypto.randomBytes(128).toString('base64')
        user.password = crypto.createHmac('sha256', user.keyWord).update(user.password).digest('hex')
        users.push(user)
        await fs.promises.writeFile(this.path, JSON.stringify(users, null, '\t'))

        return user
    }

    validateUser = async (usernameORmail, password) => {
        const users = await this.getUsers()

        const userIndex = users.findIndex(user => {
            return user.username === usernameORmail || user.mail === usernameORmail
        })

        if (userIndex === -1) console.log('User name or mail not found, please try again.')

        const userFounded = users[userIndex]

        const passwordHash = crypto.createHmac('sha256', userFounded.keyWord).update(password).digest('hex')

        if (passwordHash === userFounded.password) console.log('Welcome!' + userFounded.name)
        else console.log('Incorrect password, try again.')

    }


}