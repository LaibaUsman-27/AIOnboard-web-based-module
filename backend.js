const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(cors());


let tasks = [
  { id: 1, title: "Verify Identity", category: "Verification", dueDate: "2023-10-25", completed: false },
  { id: 2, title: "Upload Photo", category: "Profile Setup", dueDate: "2023-10-28", completed: false },
  { id: 3, title: "Complete Training", category: "Training", dueDate: "2023-11-01", completed: false },
];

let progress = {
  lessons: [
    { title: "Introduction to Webflow", progress: 70 },
    { title: "Advanced JavaScript", duration: "1.5 hours" },
    { title: "Data Structures", duration: "3 hours" },
  ],
  recentActivity: [
    { activity: "Completed JavaScript Course", date: "2023-10-01", progress: 100 },
    { activity: "Attended UX Design Workshop", date: "2023-10-05", progress: 80 },
    { activity: "Finished Project Management Certification", date: "2023-10-10", progress: 60 },
  ],
};


app.get('/dashboard', (req, res) => {
  res.json({
    message: "Welcome to the Dashboard",
    tasksOverview: tasks,
    progressOverview: progress,
  });
});


app.get('/tasks', (req, res) => {
  res.json(tasks);
});


app.post('/tasks/update', (req, res) => {
  const { id, completed } = req.body;
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = completed;
    res.json({ message: "Task updated successfully", tasks });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});


app.get('/studyplan', (req, res) => {
  res.json(progress);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
