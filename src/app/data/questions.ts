export const questions = [
    {
        questionId: 1,
        skillId: 1,
        questionTitle: 'What is Angular ?',
        option1: 'Its backend framework',
        option2: 'Automation Framework',
        option3: 'JS Library',
        option4: 'JS Framework'
    },
    {
        questionId: 2,
        skillId: 1,
        questionTitle: 'How do you load an NgModule into its own bundle?',
        option1: 'Use lazy loading with the route that leads to the NgModule',
        option2: 'Add a route to each component in the NgModule',
        option3: 'Tell the route to point to the symbol of the NgModule',
        option4: 'ng build --lazy',
        answer: "option1"
    }, 
    {
        
        questionId: 3,
        skillId: 1,
        questionTitle: 'Which of the following will map the name of an input parameter "userData" to a field named "users"?',
        option1: '@Input() userData: users',
        option2: '@Input() users: userData',
        option3: "@Input('userData') users",
        option4: "ng build --lazy",
        answer: "option4"
    },
    {
        
        questionId: 4,
        skillId: 1,
        questionTitle: 'In Angular, you can pass data from child component to parent component using?',
        option1: 'Output()',
        option2: '@Input()',
        option3: "@Output()",
        option4: "Input",
        answer: "option3"
    }
]