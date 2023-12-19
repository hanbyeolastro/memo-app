from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List

app = FastAPI()


class Memo(BaseModel):
    id: int
    content: str


memos = []


@app.post("/memo/")
async def create_memo(memo: Memo):
    memos.append(memo)
    return memo


@app.get("/memo/", response_model=List[Memo])
async def read_memos():
    return memos


@app.put("/memo/{memo_id}")
async def update_memo(memo_req: Memo):
    for memo in memos:
        if memo.id == memo_req.id:
            memo.content = memo_req.content
            return memo
    return {"error": "Memo not found"}


@app.delete("/memo/{memo_id}")
async def delete_memo(memo_id: int):
    for index, memo in enumerate(memos):
        if memo.id == memo_id:
            memos.pop(index)
            return {"result": "Memo deleted"}
    return {"error": "Memo not found"}


app.mount("/", StaticFiles(directory='static', html=True), name='static')
