'use client'
import Header from '@/components/Header'
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';

const HomePage = () => {

    const [inputValues , setInputValues] = useState({})
    const [mainData , setMainData] = useState([])
    const [selectedState , setSelectedState] = useState('');
    const [isEdited , setIsEdited] = useState('')

    

    const inputEventHandler =(e)=>{
        const {name,value} = e.target;
        // console.log("name",name , 'value',value)
        setInputValues((prev)=>({...prev,[name]:value}))
    }

    const handleSaveState =(nm)=>{
        if(!inputValues?.state && !inputValues?.city) return
        if(nm == 'st'){
            setMainData((prev)=>([...prev,{state:inputValues?.state,id:mainData.length+1}]))
            
        }else{
            if(!selectedState) return
            let allData = mainData.map((ele)=>{
                if(ele?.state == selectedState){
                    return {...ele,city:inputValues?.city}
                }
            })

            setMainData(allData)
        }
        setInputValues({})
        setSelectedState('')
        
    }

    const eventHandlerDropDown =(e)=>{
        setSelectedState(e.target.value)
    }


    const handleEdit =(ele)=>{
        setIsEdited(ele?.state)
        setInputValues(ele)
    }

    const handleDelete =(dt)=>{
        let allDAta = mainData?.filter((ele)=>(
            dt?.state !==ele?.state
        ))

        setMainData(allDAta)
    }
    

 
    return (
        <>
            <Header />
            <Container maxWidth='xl' disableGutters>
                <Grid container justifyContent={'center'} sx={{ border: "1px solid green" }}>
                    <Grid item xs={11.5} sm={11.5} md={8} lg={8} sx={{ border: "1px solid blue", width: "100%", mt: "20px" }}>
                        <Paper elevation={3} sx={{ width: '100%', border: "1px solid red" }}>
                            <Grid container justifyContent={'space-between'} >
                                <Box sx={{ display: "flex", width: "40%", m: "10px" }}>
                                    <OutlinedInput fullWidth name='state' value={inputValues?.state || ''} onChange={inputEventHandler}/>
                                    <Button variant='contained' sx={{ whiteSpace: "nowrap" }} onClick={()=>{handleSaveState('st')}}>
                                        Save State
                                    </Button>
                                </Box>

                                <Box sx={{ width: "100%", display: 'flex', justifyContent: "space-between", m: "10px" }}>
                                    <Box sx={{ width: '40%' }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">State</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="stateName"
                                                name='stateName' 
                                                value={selectedState}
                                                onChange={eventHandlerDropDown}
                                            >
                                            {
                                                mainData?.map((ele)=>(
                                                <MenuItem value={ele?.state} >{ele?.state}</MenuItem>
                                                ))
                                            }
                                               
                                            </Select>
                                        </FormControl>
                                    </Box>


                                    <Box sx={{ display: "flex", width: "40%", m: "10px" }}>
                                        <OutlinedInput fullWidth name='city' value={inputValues?.city || ''} onChange={inputEventHandler} />
                                        <Button variant='contained' sx={{ whiteSpace: "nowrap" }} onClick={()=>{handleSaveState('ct')}}>
                                            Add city
                                        </Button>
                                    </Box>

                                </Box>

                            </Grid>
                          
                            <Grid container>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead >
                                            <TableRow>
                                                <TableCell>State</TableCell>
                                                <TableCell align="right">City</TableCell>
                                                <TableCell align="right">Edit</TableCell>
                                                <TableCell align="right">Delete</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {
                                            mainData.length !==0 && mainData?.map((ele,ind)=>(
                                                <TableRow key={ind}>
                                                {
                                                    isEdited == ele?.state 
                                                    ?
                                                   <OutlinedInput fullWidth name='state' value={inputValues?.state || ''} onChange={inputEventHandler}/>
                                                    :
                                                    <TableCell component="th" scope="row">
                                                       {ele?.state}
                                                    </TableCell>
                                                }
                                                {
                                                    isEdited == ele?.state 
                                                    ?
                                                   <OutlinedInput fullWidth name='state' value={inputValues?.state || ''} onChange={inputEventHandler}/>
                                                    :
                                                    <TableCell align="right">{ele.city}</TableCell>
                                                }
                                                    <TableCell align="right">

                                                        <Button variant='contained' onClick={()=>{handleEdit(ele,ind)}}>Edit</Button>
                                                    </TableCell>
                                                    <TableCell variant='contained' align="right" onClick={()=>{handleDelete(ele)}}>Delete</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                        
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

            </Container>
        </>
    )
}

export default HomePage
