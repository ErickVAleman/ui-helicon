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
      console.log('Si quieres ver mas utiliza Firefox y habilita en la consola el XHR para ver la peticion al API');
      console.log('https://www.mozilla.org/es-MX/firefox/new/')
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
            <Paper style={{ padding: 10 }} >
                <Grid container spacing={3} >
                  <Grid item xs={12} >
                      <Typography color="primary" variant="h3" >Bloq Mayus</Typography>
                  </Grid>
                  <Grid item xs={12} >
                      <TextField id="input-text" name="sendPhrase" label="Ingresa una palabra para volverla MAYUSCULA" margin="normal" variant="outlined" fullWidth onChange={this.handleChange} />
                  </Grid>
                  <Grid item xs={12} >
                    <input type='submit' id="submitForm" style={{ display: 'none' }} />
                    <label htmlFor="submitForm" >
                      <Button fullWidth variant="contained" component="span" color="secondary" >MAYUS</Button>
                    </label>
                  </Grid>
                  <Grid item xs={12}>
                      <div>
                          <Typography color="primary" variant="h5" >{this.state.upperPhrase}</Typography>
                      </div>
                  </Grid>
                </Grid>
            </Paper>    
          </form>
          <footer>
            <span>Codigo alojado con <span role="img" aria-label="heart" >❤️</span> en <a href='https://github.com/ErickVAleman/ui-helicon' >GitHub.com</a></span>
          </footer>
        </Container>
      </div>
    );
  }
}

export default App;
