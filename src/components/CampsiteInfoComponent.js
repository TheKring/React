import React , { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Modal, ModalHeader,ModalBody, Button, Label, Row, Col} from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';




const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);



        class CommentForm extends Component{
            constructor(props){
              super(props);
                this.state={
                   isModalOpen: false
                }


                this.toggleModal = this.toggleModal.bind(this)
                this.handleSubmit = this.handleSubmit.bind(this)
            }


           


            toggleModal(){
            this.setState({
            isModalOpen:!this.state.isModalOpen
            }
        )
    }


                    handleInputChange(event){
                const target = event.target
                const name = target.name
                const value = target.type ==='select'?target.option:target.value;
                this.setState({
                    [name]:value
                }
            )
        }


        handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
        }

                render(){
                    return(
                    
                <div>
                    <Button onClick={this.toggleModal} outline color="secondary" >
                        <i className="fa fa-lg fa-pencil"/>
                        Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                        <ModalHeader className="text-light" style={{ background: `#0275d8` }}  toggle={this.toggleModal} >Submit Comment</ModalHeader>
 
                        
                <ModalBody>
                    
                        
                <LocalForm coutline color="Blue"  onSubmit={values => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <row>
                            <Label htmlFor="ratings" md={2}>Ratings </Label>
                        </row>
                        <Col md={10}>
                            <Control.select model=".ratings" id="ratings" name="ratings"
                                className="form-control" >
                                <option> </option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <row>
                        <Label className="text-nowrap" htmlFor="author" md={6}>Your Name</Label>
                        </row>
                        <Col md={10}>
                            <Control.text model=".author" id="author" name="author"
                            className="form-control" placeholder="Your Name"
                            validators={{
                                required,
                                minLength: minLength(2),
                                maxLength: maxLength(15)
                                }
                            }
                        />
                    <Errors
                            className="text-danger"
                            model=".author"
                            show="touched"
                            component="div"
                            messages={{
                                required: 'Required',
                                minLength: 'Must be at least 2 characters',
                                maxLength: 'Must be 15 characters or less'
                            }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <row>
                        <Label htmlFor="text" md={2}>Comment</Label>
                        </row>
                        <Col md={10}>
                            <Control.textarea model=".text"  id="text" name="text" row="12"
                            className="form-control"/>
                        </Col>
                    </Row>
                        <Button type="submit" className="ml-3" color="primary">
                                    Submit
                        </Button>
                    </LocalForm>
                    
                </ModalBody>
                        
                        </Modal>
                    </div>
                    
                    )
                }
            } 
            function RenderCampsite({campsite}) {
                return(
                    <div className="col-md-5 m-1">
                        <Card>
                            <CardImg top src ={campsite.image} alt ={campsite.name} />
                            <CardBody>
                                <CardText> {campsite.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                )
            }


            function RenderComments({comments, addComment, campsiteId}) {
                if (comments){
                      return(
                           <div className="col-md-5 m-1">
                             <h4>Comments</h4>
                             {comments.map(comment=>{
                                 return (
                                     <div key={comment.id}>
                                     <p>{comment.text} <br/>
                                     -- {comment.author}, -{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}-</p>
                                     </div>
                                     )
                                 }
                            ) 
                        }
                        <CommentForm campsiteId={campsiteId} addComment={addComment} />
                            </div>
                     )
                }
                return (<div></div>)
              }
              function CampsiteInfo(props) {
                if (props.isLoading) {
                    return (
                        <div className="container">
                            <div className="row">
                                <Loading />
                            </div>
                        </div>
                    );
                }
                if (props.errMess) {
                    return (
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <h4>{props.errMess}</h4>
                                </div>
                            </div>
                        </div>
                    );
                }
                if (props.campsite) {
                    return (
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <Breadcrumb>
                                        <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                                    </Breadcrumb>
                                    <h2>{props.campsite.name}</h2>
                                    <hr />
                                </div>
                            </div>
                                <div className="row">
                                    <RenderCampsite campsite={props.campsite} />
                                    <RenderComments
                                        comments={props.comments}
                                        addComment={props.addComment}
                                        campsiteId={props.campsite.id}
                                     />
                                </div>
                            </div>
                        );
                    }
                    return (<div></div>);
                }
            
export default CampsiteInfo;