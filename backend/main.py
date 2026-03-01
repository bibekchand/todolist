from fastapi import FastAPI

app = FastAPI()

class 

@app.get("/get_data")
async def root():
    return {"message": "Hello world"}

@app.post("/insertData")
async def insert_data():

