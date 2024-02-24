import { provideMockStore } from '@ngrx/store/testing';
import { ListUserComponent } from './list-user.component';
import { GetLoadingUser, GetUserSelector } from '../../redux/user/user.selector';
import { PhonePipe } from '../../pipe/phone.pipe';
import { render } from '@testing-library/angular';

describe('ListUserComponent', () => {
  it('should display a loading spinner when the user data is being fetched', async () => {
    const { getByTestId } = await renderListUser('true', []);

    const loadingSpinner = getByTestId('loading-spinner-text');
    expect(loadingSpinner).toBeTruthy();
  });

  it('should display a list of users when user data has been fetched and loading is complete', async () => {
    const { getAllByTestId } = await renderListUser(
      'false',
      [{
        user_name: 'Test',
        user_email: 'test@test.com',
        user_phone: '1234567890'
      }]
    );

    const userList = getAllByTestId('list-users');
    expect(userList.length).toBe(1);
  });

  it('should display a message indicating the list is empty when no user data is available and loading is complete', async () => {
    const { getByTestId } = await renderListUser(
      'false',
      []
    );

    const emptyListMessage = getByTestId('empty-list');
    expect(emptyListMessage.textContent?.trim()).toEqual('Nenhum usuário encontrado');
  });
});

const renderListUser = async (loading: string, users: any) => {
  const selectorLoadingUserMock = {
    selector: GetLoadingUser,
    value: loading,
  };

  const selectorErrorUserMock = {
    selector: GetUserSelector,
    value: users,
  };

  return render(ListUserComponent, {
    declarations: [PhonePipe],
    imports: [],
    providers: [provideMockStore({ selectors: [selectorLoadingUserMock, selectorErrorUserMock] })],
  })
}

