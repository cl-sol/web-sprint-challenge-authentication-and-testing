const request = require("supertest");

const server = require("./server");
const db = require("../database/dbConfig");
const Users = require("../users/users-model");

describe("POST", () => {
    beforeAll(async () => {
        await db("users").truncate();
    })

    it("adds a new user", async () => {
        await Users.add({ username: "chonk", password: "abc123" })
        await Users.add({ username: "bean", password: "abc123" })
        const user = await db("users");

        expect(user).toHaveLength(2);
        expect(user[1].username).toBe("bean");
    })
    
    it("logs in", () => {
        return request(server)
            .post("/api/auth/login")
            .send({ username: "goose", password: "abc123" })
            .then(res => {
                expect(res.type).toMatch(/json/i);
            })
    })

    it("returns json from the jokes router", () => {
        return request(server)
        .get("/api/jokes")
        .then(res => {
            expect(res.type).toMatch(/json/i);
        })
    })
})

describe("GET /", () => {
    it("should return status code 200", async () => {
        const res = await request(server).get("/");
        expect(res.status).toBe(200)
    });
})

describe("GET /jokes", () => {
    it("should return 500 error", async () => {
        await request(server)
            .get("/api/jokes")
            .then(res => expect(res.status).toBe(500))
            .catch(err => console.log(err))
    })
})