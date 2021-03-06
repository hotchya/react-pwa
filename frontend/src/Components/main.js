import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Content } from './';
import { DefaultModal } from './modals';

function Main() {

    const [state, setState] = useState(undefined)
    const [contentId, setContentId] = useState(undefined)
    const [contentsList, setContentsList] = useState(undefined)
    const [modalState, setModalState] = useState({show:false, massage:''})

    useEffect(() => {
        axios.post('http://localhost:4000/contents/list',
        {
            'userId': sessionStorage.getItem('userId'), 
            'sessionId': sessionStorage.getItem('sessionId')
        },
        {
            withCredentials: true
        })
        .then(res => {
            if(res.data.msg === undefined){
                // get response ...
                setContentsList(res.data.contentsList)
                console.log(res.data.contentsList)
            } 
            else {
                setModalState({show:true, massage: res.data.msg})
            }
        })
        .catch(err => {
            // don't get response
            setModalState({show:true, massage: err.massage})
        })
    },[])

    // modal handler
    const handleModal = () =>{
        setModalState({show:false, massage:''})
    }

    const onClickAdd = () => {
        setState('add')
    }

    const onClickView = (e) => {
        setState('view')
        setContentId(e.target.id)
        console.log(e.target.id)
    }
    
    const onLogout = () => {
        sessionStorage.removeItem('sessionId');
        sessionStorage.removeItem('userId');
        document.location.href = '/';
    }

    if(state === 'add'){
        return <Content />
    }
    else if(state === 'view'){
        return <Content contentId={contentId} />
    }
    else{
        return(
            <div>
                {/* modal */}
                <DefaultModal show={modalState.show} massage={modalState.massage} handleModal={handleModal}/> 

                <header>
                    <div class="collapse bg-dark" id="navbarHeader">
                        <div class="container">
                        <div class="row">
                            <div class="col-sm-8 col-md-7 py-4">
                            <h4 class="text-white">About</h4>
                            <p class="text-muted">Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.</p>
                            </div>
                            <div class="col-sm-4 offset-md-1 py-4">
                            <h4 class="text-white">User info</h4>
                            <ul class="list-unstyled">
                                <li class="text-white" >text</li>
                                <li><a href="#" class="text-white">link</a></li>
                                <li><a href="#" onClick={onLogout} class="text-white">Logout</a></li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="navbar navbar-dark bg-dark shadow-sm">
                        <div class="container">
                        <a href="#" class="navbar-brand d-flex align-items-center">
                            <strong>??????</strong>
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        </div>
                    </div>
                </header>
    
    
    
    
                <main>
    
                    <section class="py-5 text-center container">
                        <div class="row py-lg-5">
                        <div class="col-lg-6 col-md-8 mx-auto">
                            <h1 class="fw-light">?????????</h1>
                            <p class="lead text-muted">?????? ???????????? ?????? ????????? ????????????</p>
                            <p>
                            <a href="#" class="btn btn-primary my-2" onClick={onClickAdd}>Add content</a>
                            <a href="#" class="btn btn-secondary my-2">Secondary action</a>
                            </p>
                        </div>
                        </div>
                    </section>
    
                    <div class="album py-5 bg-light">
                        <div class="container">
                            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">



                                {/* card contents */}
                                {contentsList && Object.keys(contentsList).map((contentId) => (
                                    <div class="col">
                                    <div class="card shadow-sm">
                                        {/* <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
                                        <img src={'http://localhost:4000/contents/image/' + contentsList[contentId].image + '?sessionId=' + sessionStorage.getItem('sessionId')} class="img-thumbnail"/>
                                        <div class="card-body">
                                        <p class="card-text">{contentsList[contentId].subject}</p>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="btn-group">
                                            <button type="button" class="btn btn-sm btn-outline-secondary" id = {contentId} onClick={onClickView}>View</button>
                                            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                            </div>
                                            <small class="text-muted">9 mins</small>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                ))}
                                


                            </div>
                        </div>
                    </div>
                </main>
    
    
    
    
                <footer class="text-muted py-5">
                    <div class="container">
                        <p class="float-end mb-1">
                        <a href="#">Back to top</a>
                        </p>
                        <p class="mb-1">Album example is &copy; Bootstrap, but please download and customize it for yourself!</p>
                        <p class="mb-0">New to Bootstrap? <a href="/">Visit the homepage</a> or read our <a href="../getting-started/introduction/">getting started guide</a>.</p>
                        <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                    </div>
                </footer>
    
            </div>
    
        )

    }
    
}
 
export default Main;