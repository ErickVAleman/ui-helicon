import React, { Component } from 'react';
import { Typography, Button, TextField, Paper, Grid, Container } from "@material-ui/core";
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      phrase: null,
      upperPhrase: "...Loading"
    }
    this.onSubmitChange = this.onSubmitChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  async fetchPhrase(url) {
    try{
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch(err) {
      console.log(err);
    }
  }

  async componentWillMount(){
    try{
      const response = await this.fetchPhrase('https://api-helicon.herokuapp.com/api/v1/upperPhrase');
      console.log(response)
      this.setState({upperPhrase: response.result})

    } catch(err) {
      console.log(err);
    }
  }
  async onSubmitChange(e){
    e.preventDefault();
    await this.submitForm()
  }
  async handleChange(e){
    console.log(e.target.value); 
    this.setState({ phrase: e.target.value});
  }
  async submitForm(e) {
    try{
      console.log(this.state.phrase)
      const response = await this.fetchPhrase(`https://api-helicon.herokuapp.com/api/v1/upperPhrase?phrase=${this.state.phrase}`);
      console.log(response)
      this.setState({upperPhrase: response.result})
    } catch(err) {
      console.log(err);
    }
  }
  render(){
    return (
      <div className="App">
        <Container className="App-header">
          <form onSubmit={this.onSubmitChange} >
            <Paper style={{ minWidth: 270, minHeight: 200, padding: 10 }} >
                <Grid container spacing={3} >
                    <Grid item xs={12} >
                        <Typography color="primary" variant="h3" >Upper Phrases</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField id="input-text" name="sendPhrase" label="phrase" margin="normal" variant="outlined" fullWidth onChange={this.handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Typography color="primary" variant="h5" >{this.state.upperPhrase}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} >
                      <input type='submit' id="submitForm" style={{ display: 'none' }} />
                      <label htmlFor="submitForm" >
                        <Button variant="contained" component="span" >Enviar</Button>
                      </label>
                    </Grid>
                    <Grid item xs={12} >
                    </Grid>
                </Grid>
            </Paper>    
          </form>
          <footer>
            <span> I ❤️ <a href='https://github.com/ErickVAleman/ui-helicon' >GitHub</a></span>
          </footer>
        </Container>
      </div>
    );
  }
}

export default App;
