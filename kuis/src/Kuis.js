import * as React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Timer from './Timer'
import { Button, ButtonGroup } from '@mui/material';


function getLocalItems(props){
    const val = window.localStorage.getItem('WEB_KUIS')    
    if(val) {
        const list = JSON.parse(val)
        if(list.delay == 0 || list.number == 4) {
            if(props == "delay") {
                return +"60"
            } else if ( props == "nilai") {
                return 0
            } else {
                return 0
            }
        }
        if(props == "delay") {
            return list.delay
        } else if ( props == "nilai") {
            return list.nilai
        } else {
            return list.number
        }
    } else {
        if(props == "delay") {
            return +"60"
        } else if ( props == "nilai") {
            return 0
        } else {
            return 0
        }
    }
}

function Kuis() {
    const [question, setQuestion] = React.useState(null)
    const [number, setNumber] = React.useState(getLocalItems("number"))
    const [nilai, setNilai] = React.useState(getLocalItems("nilai"))
    const [done, setDone] = React.useState(false)
    const parser = new DOMParser();
    const [isReady, setIsReady] = React.useState(false)
    const [delay, setDelay] = React.useState(getLocalItems("delay"));
    const minutes = Math.floor(delay / 60);
    const seconds = Math.floor(delay % 60);

    const handleReady = ()=>{
        setIsReady(true)
    }

    React.useEffect(() => {
        axios.get("https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=boolean").then((response) => {
          setQuestion(response.data.results)
          console.log(response.data)
        });
      }, []);

    React.useEffect(()=>{
        window.localStorage.setItem('WEB_KUIS', JSON.stringify({number, nilai, delay}))
    })
      React.useEffect(() => {
        const timer = setInterval(() => {
          if(isReady) {
            setDelay(delay - 1);
          }
        }, 1000);
    
        if (delay === 0) {
            setDone(true)
          clearInterval(timer);
        }
        return () => {
          clearInterval(timer);
        };
      });
    

      const savedAnswers = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.value)
        if(number < 4 ) {
            if(question[number].correct_answer === e.currentTarget.value) {
                setNilai(previousValue => ++previousValue)
            }
            setNumber(previousValue => ++previousValue)
        } else {
            setDone(true)
        }
       }

  return (
    <Box>
        {isReady?
        (<Box>
            {done ?(
            <>   
                {number == 4 ? <Typography>Kamu telah menjawab semua pertanyaan</Typography> : <Typography>Selesai, Kamu menjawab {number} pertanyaan dari 5 pertanyaan</Typography>}
                
                <Typography> Kamu Benar {nilai} jawaban</Typography>
            </>
            ) : ( 
            <Box>
                {question? (
                <>
                <Typography variant='h5' fontSize={16}>
                    Waktu: {minutes}:{seconds}
                </Typography>
                <Typography variant='h5' fontSize={16}>
                        Soal: {number} / 5
                </Typography>
                <Box marginTop={2}>
                    <Typography marginBottom={2}>
                        Pertanyaan: {parser.parseFromString(`<!doctype html><body>${question[number].question}`, 'text/html').body.textContent}
                    </Typography>
                    
                    <ButtonGroup  variant="contained" aria-label="outlined primary button group">
                            <Button value="True" onClick={e => savedAnswers(e)}>True</Button>
                            <Button value="False" onClick={e => savedAnswers(e)}>False</Button>
                    </ButtonGroup>
                </Box>
                </> ): (
                    <Box>Sebentar...</Box>
                )}
                </Box>
            )}
            </Box>
        ):
        (<Box>
            <Typography fontSize={20}>
                Apa kamu sudah siap?
            </Typography>
            <Typography fontSize={15}>
                Akan ada 5 pertanyaan pilihan ganda yang harus kamu selesaikan dalam waktu 60 detik
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>handleReady()}
            >
              Siap
            </Button>
            
        </Box>)}
    </Box>
  )
}

export default Kuis