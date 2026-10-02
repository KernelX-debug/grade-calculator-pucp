package com.ghericasas.notaspucp;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

@CapacitorPlugin(name = "BackupFile")
public class BackupFilePlugin extends Plugin {
    @PluginMethod
    public void save(PluginCall call) {
        String data = call.getString("data");
        if (data == null || data.isEmpty() || data.getBytes(StandardCharsets.UTF_8).length > 2 * 1024 * 1024) {
            call.reject("La copia no es válida o supera el máximo de 2 MB.");
            return;
        }
        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("application/json");
        intent.putExtra(Intent.EXTRA_TITLE, "notas-pucp-copia.json");
        getActivity().runOnUiThread(() -> {
            try {
                startActivityForResult(call, intent, "fileCreated");
            } catch (Exception error) {
                call.reject("No se pudo abrir el selector de archivos.", error);
            }
        });
    }

    @ActivityCallback
    private void fileCreated(PluginCall call, ActivityResult result) {
        if (call == null) return;
        Uri destination = result.getData() == null ? null : result.getData().getData();
        if (result.getResultCode() != Activity.RESULT_OK || destination == null) {
            JSObject response = new JSObject();
            response.put("saved", false);
            call.resolve(response);
            return;
        }
        execute(() -> {
            try (OutputStream output = getContext().getContentResolver().openOutputStream(destination, "wt")) {
                if (output == null) throw new IOException("No se pudo abrir el archivo.");
                output.write(call.getString("data").getBytes(StandardCharsets.UTF_8));
                output.flush();
            } catch (Exception error) {
                call.reject("No se pudo guardar la copia. Elige otra ubicación e inténtalo de nuevo.", error);
                return;
            }
            JSObject response = new JSObject();
            response.put("saved", true);
            call.resolve(response);
        });
    }
}
