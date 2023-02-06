FROM python:3.11.1
EXPOSE 5000

WORKDIR /app

COPY . /app
RUN pip install -r requirements.txt

# COPY app.py /app
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
