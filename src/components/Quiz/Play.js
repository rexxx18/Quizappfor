import React, { Component } from 'react';
import questions from './Questions.json'
import M from 'materialize-css'
import isEmpty from './isempty'

export default class Play extends Component {
    constructor(props){
        super(props);

        this.state={
            questions,
            currentQuestion:{},
            nextQuestion: {},
            previousQuestions:{},
            answer:'',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex:0,
            score:0,
            previousbuttondisabled:false,
            nextbuttondisabled:false,
            correctAnswers:0,
            WrongAnswers:0,
            time:{
             
            }
    
        };
        this.interval=null;
    }

    startTimer=()=>{
        const countDownTime=Date.now() + 300000;
        this.interval=setInterval(()=>{
            const now=new Date();
            const distance=countDownTime - now;
            const minutes=Math.floor((distance%(1000*60*60))/(1000*60));
            const seconds=Math.floor((distance%(1000*60))/1000);

            if(distance<0)
            {
                clearInterval(this.interval);
                this.setState({
                    time:{
                        minutes:0,
                        seconds:0
                    }
                },()=>{
                    this.endgame();
                })
            }else{
                this.setState({
                    time:{minutes:minutes,seconds:seconds}
                })
                
            }
        },1000)
    }

    componentDidMount(){
        const {question,currentQuestion,previousQuestions,nextQuestion}=this.state;
        this.displayQuestions(question,currentQuestion,previousQuestions,nextQuestion);
        this.startTimer();
    }

    displayQuestions=(questions=this.state.questions,currentQuestion,previousQuestions,nextQuestion)=>{
                let {currentQuestionIndex}=this.state;
                if(!isEmpty(this.state.questions)){
                    questions=this.state.questions;
                    currentQuestion=questions[currentQuestionIndex];
                    nextQuestion=questions[currentQuestionIndex+1];
                    previousQuestions=questions[currentQuestionIndex-1];
                    const answer=currentQuestion.answer;
                    this.setState({
                        currentQuestion,nextQuestion,previousQuestions,answer
                    })

                }
    }

    endgame=()=>{
        alert('Quiz has ended');
        const scorecard=this.state.score

        console.log(scorecard);
        setTimeout(()=>{
            this.props.history.push('/play/quizsummary',this.state.score)
        },1000);
    }


  

       
    handlenext=()=>{
        if(this.state.nextQuestion!==undefined)
        {
            this.setState(prevState=>({
                currentQuestionIndex:prevState.currentQuestionIndex+1
            }),()=>{
                this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.previousQuestions,this.state.nextQuestion)
            })
        }else{
            this.endgame();
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    handleprev=()=>{
        if(this.state.previousQuestions!==undefined)
        {
        this.setState(prevState=>({
            currentQuestionIndex:prevState.currentQuestionIndex-1
        }),()=>{
            this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.previousQuestions,this.state.nextQuestion)
        })
    }
    }
    correctAnswer=()=>{
        M.toast({
            html:'Correct Answer',
            classes:'toast-valid',
            displayLength:1500
        });
        this.setState(prevState=>({
            score:prevState.score+1,
            correctAnswers:prevState.correctAnswers+1,
            currentQuestionIndex:prevState.currentQuestionIndex+1,
            numberOfAnsweredQuestions:prevState.numberOfAnsweredQuestions
        }),()=>{
            if(this.state.nextQuestion===undefined){
                this.endgame();
            }else{

            this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.previousQuestions,this.state.nextQuestion)
        }
        })
    }
    WrongAnswer=()=>{
        M.toast({
            html:'Wrong Answer',
            classes:'toast-invalid',
            displayLength:1500
        });
        this.setState(prevState=>({
            WrongAnswers:prevState.WrongAnswers+1,
            currentQuestionIndex:prevState.currentQuestionIndex+1,
            numberOfAnsweredQuestions:prevState.numberOfAnsweredQuestions+1

        }),()=>{
            if(this.state.nextQuestion===undefined){
                this.endgame();
            }else{

            this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.previousQuestions,this.state.nextQuestion)
        }})
    }
    handleQuit=()=>{
        if(window.confirm('Are you Sure you want to Quit???'))
        {
            this.endgame();
            this.props.history.push('/play/quizsummary',this.state.score);
        }
    }

    hanldeClick=(event)=>{
       if(event.target.innerHTML.toLowerCase()===this.state.answer.toLowerCase()){
           this.correctAnswer();
       }else{
           this.WrongAnswer();
       }
    }

   
    
    render() {
        const {currentQuestion,time}=this.state;
        
        return (
            <div>
              <h1>Quiz Page</h1>
              <div className="timercontainer">
                  <p>
                      <span style={{float:'left'}}>
                       {this.state.currentQuestionIndex+1}
                      </span><span className='Right'>{time.minutes}:{time.seconds}<span className="mdi mdi-clock-outline mdi-24px"></span></span>
                  </p>
              </div>
              <div class='Qustions-container'>
                <h5>{currentQuestion.question}</h5>
                <div className="optionscontainer">
                    <p  onClick={this.hanldeClick}>{currentQuestion.optionA}</p>
                    <p onClick={this.hanldeClick}>{currentQuestion.optionB}</p>
                </div>
                <div className="optionscontainer">
                    <p onClick={this.hanldeClick}>{currentQuestion.optionC}</p>
                    <p onClick={this.hanldeClick}>{currentQuestion.optionD}</p>
                </div>
              </div>
              <button onClick={this.handleprev}>Prev</button>
              <button onClick={this.handlenext}>Next</button>
              <button onClick={this.handleQuit}>Quit</button>
              
            </div>
        )
    }
}
