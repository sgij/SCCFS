import { ipcMain, BrowserWindow } from 'electron';
import { z } from 'zod';

const LoginInputSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

function ok(data) {
  return { ok: true, data };
}

function fail(code, message, details) {
  return {
    ok: false,
    error: { code, message, details },
  };
}

export function registerIpcHandlers() {
  ipcMain.handle('sccfs:auth:login', async (_event, payload) => {
    const parsed = LoginInputSchema.safeParse(payload);
    if (!parsed.success) {
      return fail('VALIDATION_ERROR', 'Invalid login payload', parsed.error.flatten());
    }

    return ok({
      tokenId: crypto.randomUUID(),
      username: parsed.data.username,
      role: 'administrator',
    });
  });

  ipcMain.handle('sccfs:window:minimize', () => {
    const win = BrowserWindow.getFocusedWindow();
    win?.minimize();
    return ok({});
  });

  ipcMain.handle('sccfs:window:maximize-toggle', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (!win) return ok({ isMaximized: false });

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }

    return ok({ isMaximized: win.isMaximized() });
  });

  ipcMain.handle('sccfs:window:close', () => {
    const win = BrowserWindow.getFocusedWindow();
    win?.close();
    return ok({});
  });
}
