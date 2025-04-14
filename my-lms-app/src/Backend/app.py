from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random

app = Flask(__name__)
CORS(app)  # Allow requests from React

# Load course and testimonial data
with open("courses.json", "r") as f:
    courses = json.load(f)

with open("testimonials.json", "r") as f:
    testimonials = json.load(f)

# Simulate student data storage
students = [
    {
        "id": 1,
        "username": "testuser",
        "password": "Password123!",
        "email": "test@example.com",
        "enrolled_courses": []
    }
]
student_id_counter = 2


@app.route("/register", methods=["POST"])
def register():
    global student_id_counter
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    # Check if username already exists
    if any(s["username"].lower() == username.lower() for s in students):
        return jsonify({"message": "Username already taken."}), 400

    student = {
        "id": student_id_counter,
        "username": username,
        "password": password,
        "email": email,
        "enrolled_courses": []
    }
    students.append(student)
    student_id_counter += 1
    return jsonify({"message": "Signup successful!"}), 200

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    for student in students:
        if (
            student["username"].lower() == username.lower()
            and student["password"] == password
        ):
            return jsonify({
                "message": "Login successful!",
                "student_id": student["id"]
            }), 200

    return jsonify({"message": "Invalid username or password."}), 401

@app.route("/courses", methods=["GET"])
def get_courses():
    return jsonify(courses), 200

@app.route("/testimonials", methods=["GET"])
def get_testimonials():
    selected = random.sample(testimonials, 2)
    return jsonify(selected), 200

@app.route("/enroll/<int:student_id>", methods=["POST"])
def enroll_course(student_id):
    data = request.get_json()
    course_id = data.get("id")

    student = next((s for s in students if s["id"] == student_id), None)
    if not student:
        return jsonify({"message": "Student not found."}), 404

    # Prevent duplicate enrollments
    if any(c["id"] == course_id for c in student["enrolled_courses"]):
        return jsonify({"message": "Already enrolled in this course."}), 400

    # Find course from catalog
    course = next((c for c in courses if c["id"] == course_id), None)
    if not course:
        return jsonify({"message": "Course not found."}), 404

    student["enrolled_courses"].append(course)
    return jsonify({"message": "Enrolled successfully!"}), 200

@app.route("/drop/<int:student_id>", methods=["DELETE"])
def drop_course(student_id):
    data = request.get_json()
    course_id = data.get("id")

    student = next((s for s in students if s["id"] == student_id), None)
    if not student:
        return jsonify({"message": "Student not found."}), 404

    before_count = len(student["enrolled_courses"])
    student["enrolled_courses"] = [
        c for c in student["enrolled_courses"] if c["id"] != course_id
    ]
    after_count = len(student["enrolled_courses"])

    if before_count == after_count:
        return jsonify({"message": "Course was not enrolled."}), 400

    return jsonify({"message": "Dropped course successfully."}), 200

@app.route("/student_courses/<int:student_id>", methods=["GET"])
def get_student_courses(student_id):
    student = next((s for s in students if s["id"] == student_id), None)
    if not student:
        return jsonify([]), 200  # Gracefully return empty list

    return jsonify(student["enrolled_courses"]), 200

if __name__ == "__main__":
    app.run(debug=True)
