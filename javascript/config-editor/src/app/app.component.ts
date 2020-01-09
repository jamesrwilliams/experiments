import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Config Editor';
  nodeList;
  nodes;
  inputFiles;
  config;
  data;
  output;
  original;

  constructor(private formBuilder: FormBuilder) {

    this.nodeList = this.formBuilder.group({
      nodes: this.formBuilder.array([]),
    });

    this.inputFiles = this.formBuilder.group({
      file: [null, Validators.required]
    });

  }

  getPreview(node, index) {
    const result = this.parseKey(node.value.key, this.config);

    this.nodes = this.nodeList.get('nodes') as FormArray;
    this.nodes.controls[index].controls.current.setValue(result);

  }

  onFileChange(event) {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsText(file);

      reader.onload = () => {
        this.config = JSON.parse(reader.result);
        this.original = this.config;
      };
    }
  }

  createNode(): FormGroup {
    return this.formBuilder.group({
      key: [null, Validators.required],
      current: [null],
      value: [null, Validators.required]
    });
  }

  /**
   *
   * @param {string} key
   * @param {object} object
   * @param {string} replace
   */
  parseKey(key, object, replace = '', ) {
    const parts = key.split('.');
    const langRegex = /^[a-z]{2}-[A-Z]{2}$/;

    let base = {...object};
    let foundLanguageRegex = false;
    let finalIndex = '';

    if (base) {

      parts.forEach((part) => {
        if (part.match(langRegex)) {
          foundLanguageRegex = true;
          base = base[part];
        } else if (foundLanguageRegex) {
          finalIndex += '.' + part;
        } else {
          base = base[part];
        }
      });
      finalIndex = finalIndex.substr(1);

      if (replace !== '') {
        base[finalIndex] = replace;
      }

      if ( finalIndex === '') {
        console.log('Selected an object node. Would be a good idea to edit these sub=nodes separately');
        const keys = Object.keys(base);
        console.log(keys);
      }

      const result = finalIndex !== '' ? base[finalIndex] : JSON.stringify(base);
      return result;

    } else {
      console.log('Error loading config');
      return false;
    }

  }

  addNode(): void {
    this.nodes = this.nodeList.get('nodes') as FormArray;
    this.nodes.push( this.createNode() );
  }

  removeNode(index): void {
    const list = this.nodeList.get('nodes') as FormArray;
    list.removeAt(index);
  }

  processNewJSON(): void {
    const tasks = this.nodeList.value.nodes;
    let copy = this.config;
    if (tasks) {

      tasks.forEach((task) => {
        const key = task.key;
        const newValue = task.value;
        this.parseKey(key, copy, newValue);
      });

    }

    this.output = copy;

  }

}
