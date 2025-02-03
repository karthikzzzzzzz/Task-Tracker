from http.client import HTTPException
from sys import exception
from fastapi import FastAPI,Depends
import models
from database import engine, get_db
from models import Todo
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from schemas import Task

app= FastAPI()

models.Base.metadata.create_all(engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)



@app.get("/")
def health_check():
    return {"status":"healthy"}

@app.post("/create-task")
def create_task(task:Task,db: Session = Depends(get_db)):
    try:
        new_task=Todo(title=task.title,completed=False)
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        return new_task
    except exception:
        raise HTTPException(status_code=404, detail="Task with ID not found")

@app.get("/get-tasks")
def get_tasks(db: Session = Depends(get_db)):
    try:
        tasks = db.query(Todo).all()
        return tasks
    except exception:
        raise HTTPException(status_code=404, detail="The Table is empty")
    
@app.delete("/delete-tasks/{id}")
def delete_tasks(id:int , db: Session = Depends(get_db)):
    try:
        task=db.query(Todo).filter(Todo.id==id).first()
        db.delete(task)
        db.commit()
        return {"message":"Task deleted successfully"}
        
    except exception:
        raise HTTPException(status_code=404, detail="Cannot delete task with ID")    


@app.put("/update-status")
def update_status(id:int,db: Session = Depends(get_db)):
    try:
        task=db.query(Todo).filter(Todo.id==id).first()
        task.completed= not task.completed
        db.commit()
        db.refresh(task)
        return task
    except exception:
        raise HTTPException(status_code=404, detail="Cannot update task with ID")
