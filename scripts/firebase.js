class myFirebase {
    constructor() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyBxh8JAbewMJY_7EORXLiqs_T0Ymox2d4E",
            authDomain: "api-project-626876413314.firebaseapp.com",
            databaseURL: "https://api-project-626876413314.firebaseio.com",
            projectId: "api-project-626876413314",
            storageBucket: "api-project-626876413314.appspot.com",
            messagingSenderId: "626876413314",
            appId: "1:626876413314:web:241d5ce826c8d939"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    saveMessage(obj) {
        firebase.database().ref('/messages/').push({
            name: obj.name,
            email: obj.email,
            date: obj.date,
            message: obj.message,
            visible: obj.visible
        }, (error) => {
            if (error) {
                alert('Mensagem nao pode ser enviada.' + error);
            } else {
                window.location.href = obj.page;
            }
        });
    }

    saveRSVP(obj) {
        firebase.database().ref('/messages/').push({
            name: obj.name,
            email: obj.email,
            phone: obj.phone,
            choose: obj.choose,
            date: obj.date,
            visible: obj.visible
        }, (error) => {
            if (error) {
                alert('Confirmacao de presenca nao pode ser enviada.' + error);
            } else {
                window.location.href = obj.page;
            }
        });
    }

    getMessages() {
        return new Promise((resolve) => {
            firebase.database().ref('/messages').once('value').then((data) => {
                resolve(data.val().filter((f) => f.visible));
            });
        });
    }
}