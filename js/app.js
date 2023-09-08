angular.module('app', ['components'])
 
.controller('UserList', function($scope, $timeout) {
  $scope.userType = ['Admin', 'Driver'];
  $scope.titleHeader = {    
    username: 'Username',
    first_name: 'First Name',
    last_name: 'Last Name',
    email: 'Email',
    password: 'Password',
    user_type: 'Type'
  };
  $scope.userList = [
    {
      username: 'user1',
      first_name: 'user1',
      last_name: 'user1',
      email: 'user1@mail.com',
      password: 'qwer1234',
      user_type: 'Admin'
    },
    {
      username: 'user2',
      first_name: 'user2',
      last_name: 'user2',
      email: 'user2@mail.com',
      password: 'qwer1234',
      user_type: 'Driver'
    },
    {
      username: 'user3',
      first_name: 'user3',
      last_name: 'user3',
      email: 'user3@mail.com',
      password: 'qwer1234',
      user_type: 'Driver'
    },
    {
      username: 'user4',
      first_name: 'user4',
      last_name: 'user4',
      email: 'user4@mail.com',
      password: 'qwer1234',
      user_type: 'Admin'
    },
  ];
  $scope.user = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    repPassword: '',
    user_type: ''
  }
  $scope.userInfo = {
    type: '',
    showUser: false,
    wrongPass: false,
    notUniqeID: false,
    error: {
      show: false,
      text: ''
    },
    success: {
      show: false,
      text: ''
    }
  }

  $scope.openUser = function (type, user) {
    $scope.userInfo.type = type;
    switch (type) {
      case 'close':   
        $scope.userInfo.showUser = false;
        this.clearUser();
        break;    
      case 'create':   
        this.clearUser();
        $scope.userInfo.showUser = true;
        break;    
      case 'edit':   
        $scope.user = angular.copy(user);
        $scope.userInfo.showUser = true;
        break;    
      default:
        break;
    }
  }

  $scope.manageUser = function(type, user) { 
    if (type == 'delete') {
      this.addEdit(type, user);
    } else if (user.password != user.repPassword) {
      $scope.userInfo.wrongPass = true;
      this.errorSuccess('error', "Passwords don't match");
    } else if (type == 'create' && this.checkUsername(user)) {
      $scope.userInfo.wrongPass = false;   
      this.errorSuccess('error', "Username must be uniqe");
    } else {
      $scope.userInfo.wrongPass = false;
      $scope.userInfo.notUniqeID = false;   
      this.addEdit(type, user);
    }
  }

  $scope.checkUsername = function (user) {
    for (let i = 0; i < this.userList.length; i++) {
      const e = this.userList[i];
      if (e.username == user.username) {
        $scope.userInfo.notUniqeID = true;   
        return true;
      }
    }
  }
  $scope.addEdit = function (type, user) {
    let currentUser = angular.copy(user);
    delete currentUser.repPassword;
    switch (type) {
      case 'create':
        this.userList.push(currentUser);
        this.errorSuccess('success', 'New user created');
        this.openUser('close');
        break;
      case 'edit':
        for (let i = 0; i < this.userList.length; i++) {
          const e = this.userList[i];
          if (e.username == currentUser.username) {
            this.userList[i] = currentUser;
            this.errorSuccess('success', 'Edit completed');
            this.openUser('close');
          }
        }
        break;
      case 'delete':
        for (let i = 0; i < this.userList.length; i++) {
          const e = this.userList[i];
          if (e.username == currentUser.username) {
            this.userList.splice(i,1);
            this.errorSuccess('success', 'User deleted');
            this.openUser('close');
          }
        }
        break;
      default:
        break;
    }
  }

  $scope.clearUser = function () {
    $scope.user = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      repPassword: '',
      user_type: ''
    }
  }
  
  $scope.errorSuccess = function (type, text) {
    $scope.userInfo[type] = {
      show: true,
      text: text
    };
    $timeout(function () {
      $scope.userInfo[type] = {
        show: false,
        text: ''
      }
    }, 3000);   
  };
});