from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///jobs.db'
db = SQLAlchemy(app)

# Job Model
class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    expected_start = db.Column(db.String(50))
    deadline = db.Column(db.String(50))
    works_number = db.Column(db.String(50), unique=True, nullable=False)
    site_number = db.Column(db.String(50))
    site_description = db.Column(db.Text)
    engineers = db.Column(db.String(255))  # Comma-separated names
    account_manager = db.Column(db.String(100))
    status = db.Column(db.String(50), default='Open')
    hired_equipment = db.Column(db.String(255))  # Comma-separated

# Notes Model
class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    note = db.Column(db.Text, nullable=False)

# Initialize Database
with app.app_context():
    db.create_all()

# Default Route
@app.route('/')
def home():
    return "Job Logging System API is Running!"

# API Routes
@app.route('/jobs', methods=['GET'])
def get_jobs():
    jobs = Job.query.all()
    return jsonify([{
        'id': job.id,
        'date_created': job.date_created.strftime('%Y-%m-%d %H:%M'),
        'expected_start': job.expected_start,
        'deadline': job.deadline,
        'works_number': job.works_number,
        'site_number': job.site_number,
        'site_description': job.site_description,
        'engineers': job.engineers,
        'account_manager': job.account_manager,
        'status': job.status,
        'hired_equipment': job.hired_equipment
    } for job in jobs])

@app.route('/jobs', methods=['POST'])
def create_job():
    data = request.json
    new_job = Job(
        expected_start=data['expected_start'],
        deadline=data['deadline'],
        works_number=data['works_number'],
        site_number=data['site_number'],
        site_description=data['site_description'],
        engineers=','.join(data['engineers']),
        account_manager=data['account_manager'],
        status=data['status'],
        hired_equipment=','.join(data['hired_equipment'])
    )
    db.session.add(new_job)
    db.session.commit()
    return jsonify({'message': 'Job created successfully'}), 201

@app.route('/jobs/<int:job_id>/notes', methods=['POST'])
def add_note(job_id):
    data = request.json
    new_note = Note(job_id=job_id, note=data['note'])
    db.session.add(new_note)
    db.session.commit()
    return jsonify({'message': 'Note added successfully'})

if __name__ == '__main__':
    app.run(debug=True)
