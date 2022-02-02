import {NotificationManager} from 'react-notifications'

export const notificationSuccess = (message: string, title?: string) => NotificationManager.success(message, title || 'Sukces', 3000);
export const notificationInfo = (message: string, title?: string) => NotificationManager.info(message, title || 'Info', 3000);
export const notificationWarning = (message: string, title?: string) => NotificationManager.warning(message, title || 'Uwaga!', 3000);
export const notificationError = (message: string, title?: string) => NotificationManager.error(message, title || 'Błąd!', 3000);

export const handleNotificationException = (exc: any) => {
  console.log(exc)
  if (!exc.response) return notificationError('Wystąpił nieznany błąd!', 'Nieznany błąd!')

  if(!exc.response.data) return notificationError('Wystąpił nieobsługiwany błąd komunikacji z serwerem!', 'Nieznany błąd!')

  console.log(exc.response.data.response.message)
  switch (exc.response.data.response.message) {
    case 'not-authenticated':
      notificationError('Użytkownik nie jest zalogowany');
      break;
    case 'invalid-email-or-password':
      notificationError('Email lub hasło są nieprawidłowe');
      break;
    case 'server-fail':
      notificationError('Coś ostro poszło nie tak');
      break;
    case 'admin-cannot-change-their-own-data':
      notificationError('Niedozwolona akcja');
      break;
    case 'email-in-use':
      notificationError('Adres email jest już zajęty');
      break;
    case 'invalid-filter-format':
      notificationError('Coś poszło nie tak');
      break;
    case 'invalid-equipment-id':
    case 'invalid-blueprint-id':
    case 'invalid-comment-id':
    case 'invalid-log-id':
    case 'invalid-exercise-id':
    case 'invalid-category-id':
    case 'invalid-muscle-id':
    case 'invalid-measurement-id':
      notificationError('Zasób o podanym id nie istnieje');
      break;
    default:
      notificationError('Wystąpił nieobsługiwany błąd komunikacji z serwerem!', 'Nieznany błąd!');
      break;
  }
}

export const handleNotificationResponse = (response: any) => {
  if(!response.data || !response.data.response) return notificationWarning('Brak informacji zwrotnej od serwera');

  console.log(response.data.response.message)
  switch(response.data.response.message) {
    case 'user-authenticated':
      notificationSuccess('Zalogowano pomyślnie');
      break;
    case 'user-incomplete':
      notificationInfo('Należy uzupełnić dane');
      break;
    case 'user-logged-out':
      notificationSuccess('Wylogowano pomyślnie');
      break;
    case 'user-updated':
      notificationSuccess('Pomyślnie zaktualizowano dane');
      break;
    case 'user-created':
      notificationSuccess('Pomyślnie utworzono konto');
      break;
    case 'equipment-created':
      notificationSuccess('Pomyślnie dodano wyposażenie');
      break;
    case 'equipment-updated':
      notificationSuccess('Pomyślnie zaktualizowano wyposażenie');
      break;
    case 'equipment-deleted':
      notificationSuccess('Pomyślnie usunięto wyposażenie');
      break;
    case 'exercise-created':
      notificationSuccess('Pomyślnie dodano ćwiczenie');
      break;
    case 'exercise-updated':
      notificationSuccess('Pomyślnie zaktualizowano ćwiczenie');
      break;
    case 'exercise-deleted':
      notificationSuccess('Pomyślnie usunięto ćwiczenie');
      break;
    case 'category-created':
      notificationSuccess('Pomyślnie dodano kategorię');
      break;
    case 'category-updated':
      notificationSuccess('Pomyślnie zaktualizowano kategorię');
      break;
    case 'category-deleted':
      notificationSuccess('Pomyślnie usunięto kategorię');
      break;
    case 'muscle-created':
      notificationSuccess('Pomyślnie dodano grupę mięśniową');
      break;
    case 'muscle-updated':
      notificationSuccess('Pomyślnie zaktualizowano grupę mięśniową');
      break;
    case 'muscle-deleted':
      notificationSuccess('Pomyślnie usunięto grupę mięśniową');
      break;
    case 'body-measurement-created':
      notificationSuccess('Pomyślnie dodano wpis');
      break;
    case 'body-measurement-updated':
      notificationSuccess('Pomyślnie zaktualizowano wpis');
      break;
    case 'body-measurement-deleted':
      notificationSuccess('Pomyślnie usunięto wpis');
      break;
    case 'comment-created':
      notificationSuccess('Pomyślnie dodano komentarz');
      break;
    case 'comment-updated':
      notificationSuccess('Pomyślnie zaktualizowano komentarz');
      break;
    case 'comment-deleted':
      notificationSuccess('Pomyślnie usunięto komentarz');
      break;
    case 'blueprint-created':
      notificationSuccess('Pomyślnie dodano schemat');
      break;
    case 'blueprint-updated':
      notificationSuccess('Pomyślnie zaktualizowano schemat');
      break;
    case 'blueprint-deleted':
      notificationSuccess('Pomyślnie usunięto schemat');
      break;
    case 'log-created':
      notificationSuccess('Pomyślnie dodano schemat');
      break;
    case 'log-updated':
      notificationSuccess('Pomyślnie zaktualizowano schemat');
      break;
    case 'log-deleted':
      notificationSuccess('Pomyślnie usunięto schemat');
      break;
    case 'profile-completed':
      notificationSuccess('Profil został uzupełniony');
      break;
    case 'profile-updated':
      notificationSuccess('Profil został zaktualizowany');
      break;
    default: 
      notificationInfo('Odpowiedź nieobsługiwana!');
      break;
  }
}