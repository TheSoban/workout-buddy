import { useEffect, useState } from "react";
import { TRole } from "../../../store/auth";
import { IUser } from "../../../typescript/interfaces";
import API from "../../../utils/axios";
import { handleNotificationException, handleNotificationResponse } from "../../../utils/notifications";


const Admin = () => {
  const [updating, setUpdating] = useState(false);
  const [users, setUsers] = useState<IUser[]>([])

  const updateItem = async (id: number) => {
    setUpdating(true);
    const user = users.find((user) => user.user_id === id);
    if(user) {
      try {
        const res = await API.post(`/admin/user/${id}/update`, {role: user.role, disabled: user.disabled})
        handleNotificationResponse(res);
        await loadItems();
      } catch (exc) {
        handleNotificationException(exc);
      }
    }
    setUpdating(false);
  }

  const loadItems = async () => {
    try {
      const res = await API.get<any>('/admin/user');
      setUsers(res.data.response.users);
    } catch (exc) {
      handleNotificationException(exc);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  return <div>
    <h1>Zarządzanie użytkownikami</h1>
    <figure>
      <table>
        <thead>
          <tr>
            <th>Identyfikator</th>
            <th>Nazwa</th>
            <th>Provider</th>
            <th>Uzupełniony</th>
            <th>Zablokowany</th>
            <th>Rola</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(({completed,disabled, provider,role,user_id,username}) => (
              <tr key={user_id}>
                <th>{user_id}</th>
                <th>{username}</th>
                <th>{provider}</th>
                <th align="center">
                  <input disabled={true} type="checkbox" name="completed" checked={completed} onChange={e => e.preventDefault()} />
                </th>
                <th align="center">
                  <input  disabled={updating} type="checkbox" name="disabled" checked={disabled} onChange={e => setUsers(s => s.map(user => user.user_id === user_id ? {...user, disabled: !disabled} : user))} />
                </th>
                <th>
                  <select style={{marginBottom: '0'}} name="role" value={role} onChange={e => setUsers(s => s.map(user => user.user_id === user_id ? {...user, role: e.target.value as TRole} : user))}>
                    <option value="standard" label="Standard" />
                    <option value="moderator" label="Moderator" />
                    <option value="admin" label="Admin" />
                  </select>
                </th>
                <th>
                  <button aria-busy={updating} disabled={updating} style={{marginBottom: '0'}} className="outline" onClick={() => updateItem(user_id)}>
                    Zapisz
                  </button>
                </th>
              </tr>
            ))
          }
        </tbody>
      </table>
    </figure>
  </div>;
};

export default Admin;
