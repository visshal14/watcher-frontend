package com.visshal.app;

import android.content.Context;
import android.os.Bundle;
import android.view.View;

import com.getcapacitor.BridgeActivity;

import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import android.view.inputmethod.InputMethodManager;
public class MainActivity extends BridgeActivity {


    @Override
    public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
  
     
        registerPlugin(GoogleAuth.class);
    }
//    @Override
//    public void onStart() {
//        View yourView = null;
//        yourView.requestFocus();
//        showSoftKeyboard(yourView);
//        super.onStart();
//    }
//    public void showSoftKeyboard(View view) {
//        if(view.requestFocus()){
//            InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
//            imm.showSoftInput(view,InputMethodManager.SHOW_IMPLICIT);
//        }
//    }

}
