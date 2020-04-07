package com.example.quince;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.example.quince.retrofit.APIService;

import androidx.appcompat.app.AppCompatActivity;

public class giris extends AppCompatActivity {
    
    Button bntnOfSendRequest;
    String type = "cce";
    private APIService apiService;
    String user;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_giris);


        Button kayit = (Button)findViewById(R.id.kayit);

        kayit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), kayit.class);
                startActivity(intent);
            }
        });
    }
}
