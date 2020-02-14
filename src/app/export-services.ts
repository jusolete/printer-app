import { LoginService } from './services/login.service';
import { AuthGuardService } from './guards/authGuard';
import { ModalService } from './services/modals/modal.service';

export const ServicesArray = [
    LoginService,
    AuthGuardService,
    ModalService
]
