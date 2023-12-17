import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {

  loggedUserData: any;
  eventList: any[]=[];
  constructor(private http: HttpClient){
    const localData= localStorage.getItem('eventUser');
    if(localData != null) { 
      this.loggedUserData = JSON.parse(localData);
      this.loadEvent();
    }
  }

  loadEvent() {
    this.http.get('https://freeapi.miniprojectideas.com/api/EventBooking/GetEventsByOrganizer?organizerId='+ this.loggedUserData.userId).subscribe((res:any)=>{
      this.eventList = res.data;
    })

  }
  onDeleteEvent(id: string): void {
    console.log('Deleting event with ID:', id);
  
    this.http.delete(`https://freeapi.miniprojectideas.com/api/EventBooking/DeleteBookingById?id=${id}`)
      .subscribe(
        () => {
          console.log('Event deleted successfully');
          // Optionally, reload the eventList after deletion
          this.loadEvent();
        },
        (error) => {
          console.error('Error deleting event', error);
        }
      );
  }
  
  }
  
