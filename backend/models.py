from xmlrpc.client import Boolean
from database import Base
from sqlalchemy import Column,Integer,String,Boolean


class Todo(Base):
    __tablename__='todo'
    id=Column(Integer,primary_key=True,index=True,autoincrement=True)
    title=Column(String)
    completed = Column(Boolean)