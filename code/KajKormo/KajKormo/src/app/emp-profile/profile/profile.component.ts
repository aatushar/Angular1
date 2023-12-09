import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  profileForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(userId).subscribe(user => {
      this.user = user;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      mobile: [this.user.mobile, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      nid: [this.user.nid, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      picture: [this.user.picture]  // You may need to handle image uploads separately
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      // Update the user profile with the form values
      const updatedUser: User = {
        ...this.user,
        name: this.profileForm.value.name,
        mobile: this.profileForm.value.mobile,
        nid: this.profileForm.value.nid,
        picture: this.profileForm.value.picture
      };

      // Call a service to update the user profile
      this.userService.updateUser(updatedUser).subscribe(updatedUser => {
        this.user = updatedUser;
        // Optionally, provide feedback to the user
      });
    }
  }
}
