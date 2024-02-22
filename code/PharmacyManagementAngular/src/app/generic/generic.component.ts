import { Component, OnInit } from '@angular/core';
import { Generic } from '../model/generic.model';
import { GenericService } from '../service/generic.service';


@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrl: './generic.component.css'
})
export class GenericComponent implements OnInit{


  generics: Generic[] = [];
  selectedGeneric?: Generic;
  newGenericName: string = '';

  constructor(private genericService: GenericService) { }

  ngOnInit(): void {
    this.loadGenerics();
  }

  loadGenerics(): void {
    this.genericService.getAll().subscribe({
      next: generics => this.generics = generics,
      error: err => console.error('Error loading generics', err)
    });
  }



  addNewGeneric(): void {
    if (this.newGenericName.trim() !== '') {
      const newGeneric: Generic = { name: this.newGenericName.trim() };
      this.genericService.create(newGeneric).subscribe(
        response => {
          console.log('New generic added successfully', response);
          this.loadGenerics(); // Refresh the list of generics after adding new one
          this.newGenericName = ''; // Clear the input field
        },
        error => {
          console.error('Error adding new generic', error);
          alert('Error adding new generic');
        }
      );
    }
  }


onSelect(generic: Generic): void {
  this.selectedGeneric = generic;
}


  save(generic: Generic): void {
    if (generic.id) {
      this.genericService.update(generic.id, generic).subscribe(() => this.loadGenerics());
    } else {
      this.genericService.create(generic).subscribe(() => this.loadGenerics());
    }
  }

  delete(id: number): void {
    this.genericService.delete(id).subscribe(() => {
      this.generics = this.generics.filter(g => g.id !== id);
    });
  }

}
