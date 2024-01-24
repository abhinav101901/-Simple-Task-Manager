## Question :1- How long did you spend on the coding test? 
### Answer : I spent 9 hours on this project, with 4 hours dedicated to technical tasks such as coding, testing, and code optimization. The remaining time was devoted to the UI aspect.


## Question :2- What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

### Answer : Fragments in React simplify component structure by allowing the grouping of multiple child elements without introducing unnecessary parent elements in the DOM. Before React 16.0, we often needed to use a parent div for multiple elements. Fragments provide a cleaner solution, enhancing the readability and simplicity of React components.

## Example :  
     import React from 'react';

### // Without Fragments (pre-React 16.0)
class WithoutFragments extends React.Component {
  render() {
    return (
      <div>
        <h1>Title</h1>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </div>
    );
  }
}

### // With Fragments (React 16.0 and later)
class WithFragments extends React.Component {
  render() {
    return (
      <>
        <h1>Title</h1>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </>
    );
  }
}

export default { WithoutFragments, WithFragments };

Using fragments makes your component structure cleaner and avoids unnecessary elements in the DOM hierarchy. This is especially beneficial when you want to avoid additional styling or layout adjustments caused by extra parent elements.

### Question :3- How would you track down a performance issue in production? Have you ever had to do this?
 Answer : In my recent job. I was not in the production team. So I have not done such work but in my training, I have learned to handle such issues with the help of logging, checking network latency and A/B testing.

### Question :4- If you had more time, what additional features or improvements would you consider adding to the task management application? 
1 User Authentication: Implement user authentication to allow multiple users to have personalized task lists. Add user registration and login functionality.
2 Reminders and Notifications: Implement reminders for upcoming tasks. Integrate notifications (email, push notifications) for important task deadlines.
3 Attachments: Allow users to attach files or links to tasks for additional context. Provide a file upload feature.
4 Themes and Customization: Allow users to choose different themes or customize the application's appearance. Implement a dark mode option for better usability in low-light environments.
5 Mobile Responsiveness: Ensure the application is fully responsive and user-friendly on various devices, especially mobile phones and tablets.

